const Resources = require('../database/model/Resources')
const router = require('express').Router()

router.post('/addItem', (req,res) => {
  Resources.insertMany(req.body)
    .then(result => {
      res.status(200).json({
        item: result,
        msg: 'Item succesfully added'
      })
    })
})
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
router.post("/search", (req, res) => {
  const search = req.body.search;
  const regexSearch = new RegExp(search);
  Resources.find({
    name: {
      $regex: regexSearch,
      $options: "i",
    },
  })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ msg: "cannot get apple data" });
    });
});
router.get("/laptop", (req, res) => {
  Resources.find({ category: "laptop" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ msg: "cannot get laptop data" });
    });
});
router.get("/handphone", (req, res) => {
  Resources.find({ category: "handphone" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ msg: "cannot get laptop data" });
    });
});

module.exports = router
  // router.post("/search", (req, res) => {
  //   Resources.find({
  //     $text: {
  //       $search: req.body.search,
  //     },
  //   })
  //     .then((result) => {
  //       res.status(200).json(result);
  //     })
  //     .catch((err) => {
  //       res.status(404).json({ msg: "cannot get apple data" });
  //     });
  // });