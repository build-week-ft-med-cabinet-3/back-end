const router = require('express').Router();

const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")

const Users = require("../database/users-model");



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
    res.status(400).json({message: 'please provide username and password - password should be alphanumeric'})
  }
});



router.post('/login', (req, res) => {
  
  const { username, password } = req.body

  if (isValid(req.body)) {
      Users.findBy({username: username})
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
      res.status(400).json({message: "Please provide your username and password."})
  }
});


router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Users.findById(id)
    .then(user => {
      if (user) {
        Schemes.update(changes, id)
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
  




//-----------------------------------------

function makeJwt(user) {

  const payload = {
      username: user.username,
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
  return Boolean(user.username && user.password && typeof user.password === "string");
}

module.exports = router;
