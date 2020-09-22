const router = require('express').Router();

const Strains = require("./strains-model");


router.post('/', (req, res) => {

    Strains.add(req.body)
        .then(strain => {
            res.status(201).json({data: strain})
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })

})

router.get('/', (req, res) => {

    Strains.find().where({user_id: req.params.id})
        .then(strains => {
            res.status(200).json({data: strains})
        })
        .catch(err => {
            res.status(500).json({error: err})
        })

})

router.delete('/:id', (req, res) => {

    Strains.remove(id)
    .then(deleted => {
        if (deleted) {
          res.status(200).json({ message: 'Strain deleted!' });
        } else {
          res.status(404).json({ message: 'Could not find strain with given id' });
        }
      })
      .catch(err => {
        res.status(500).json({ message: `Failed to delete strain because ${err.message}.` });
      });

})


module.exports = router;