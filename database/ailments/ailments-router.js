const router = require('express').Router();

const Ailments = require("./ailments-model");


router.post('/', (req, res) => {

    Ailments.add(req.body)
        .then(ailments => {
            res.status(201).json({symptoms: ailments})
        })
        .catch(error => {
            res.status(500).json({message: error.message})
        })

})


module.exports = router;