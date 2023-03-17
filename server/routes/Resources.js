const Resources = require('../database/model/Resources')
const router = require('express').Router()

router.get('/acer', (req,res) => {
    Resources.find({brand: 'Acer'})
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(404).json({msg: 'cannot get acer data'})
        })
})
router.get('/asus', (req,res) => {
    Resources.find({brand: 'Asus'})
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(404).json({msg: 'cannot get asus data'})
        })
})
router.get('/apple', (req,res) => {
    Resources.find({brand: 'Apple'})
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(404).json({msg: 'cannot get apple data'})
        })
})
router.post('/search', (req,res) => {
    Resources.find({
        $text: {
            $search: req.body.search
        }
    })
        .then(result => {
            res.status(200).json(result)
        }).catch(err => {
            res.status(404).json({msg: 'cannot get apple data'})
        })
})

module.exports = router