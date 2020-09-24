const router = require('express').Router();

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
const cors = require('cors');

const Users = require("../database/users-model");

const restricted = require("./authenticate-middleware")

router.use(cors());

router.post('/register', (req, res) => {
  
  const credentials = req.body

  if (isValid(credentials)) {

    const rounds = process.env.BCRYPT_ROUNDS || 8
    const hash = bcryptjs.hashSync(credentials.password, rounds)

    credentials.password = hash

    Users.add(credentials)
        .then(user => {
          res.status(201).json({data: user})
        })
        .catch(error => {
          res.status(500).json({error: error.message})
        })
  } else {
    res.status(400).json({message: 'please provide email and password - password should be alphanumeric'})
  }
});


router.get('/', restricted, (req, res) => {

    Users.find()
        .then(users => {
            res.status(200).json(users)
        })

})



router.post('/login', (req, res) => {
  
  const { email, password } = req.body

  if (isValid(req.body)) {
      Users.findBy({email: email})
          .then(([user]) => {
              // console.log(user)
              if (user && bcryptjs.compareSync(password, user.password)) {

                  const token = makeJwt(user)
                  res.status(200).json({ token })

              } else {
                  res.status(401).json({message: "Invalid credentials"})
              }
          })
          .catch(error => {
              console.log(error)
              res.status(500).json({error: error})
          })
  } else {
      res.status(400).json({message: "Please provide your email and password."})
  }
});

// router.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.header(
//         'Access-Control-Allow-Headers',
//         'Origin, X-Requested-With, Content-Type, Accept'
//     )
//     next()
// })


router.put('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Users.findById(id)
    .then(user => {
      if (user) {
        Users.update(changes, id)
        .then(updatedUser => {
          res.json(updatedUser);
        });
      } else {
        res.status(404).json({ message: 'Could not find user with given id' });
      }
    })
    .catch (err => {
      res.status(500).json({ message: 'Failed to update user' });
    });
});


router.delete('/:id', restricted, (req, res) => {

    const {id} = req.params

    Users.remove(id)
    .then(deleted => {
        if (deleted) {
          res.status(200).json({ message: 'User deleted!' });
        } else {
          res.status(404).json({ message: 'Could not find user with given id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete user because ${err.message}.` });
      });

})
  




//-----------------------------------------

function makeJwt(user) {

  const payload = {
      email: user.email,
      id: user.id
  }

  const config = {
      jwtSecret: process.env.JWT_SECRET || 'is it secret, is it safe?'
  }

  const options = {
      expiresIn: '8 hours'
  }

  return jwt.sign(payload, config.jwtSecret, options)
}




function isValid(user) {
  return Boolean(user.email && user.password && typeof user.password === "string");
}

module.exports = router;
