const Resources = require('../database/model/Resources')
const router = require('express').Router()

router.get("/all-Item", (req, res) => {
  Resources.find()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res
        .status(404)
        .json({ msg: "Cannot find the item, something went wrong" });
    });
});
router.post("/addItem", (req, res) => {
  Resources.insertMany(req.body).then((result) => {
    res.status(200).json({
      item: result,
      msg: "Item succesfully added",
    });
  });
});
router.get("/acer", (req, res) => {
  Resources.find({ brand: "Acer" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ msg: "cannot get acer data" });
    });
});
router.get("/asus", (req, res) => {
  Resources.find({ brand: "Asus" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ msg: "cannot get asus data" });
    });
});
router.get("/apple", (req, res) => {
  Resources.find({ brand: "Apple" })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(404).json({ msg: "cannot get apple data" });
    });
});
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
router.delete("/delete-item/:id", (req, res) => {
  const id = req.params.id;
  Resources.findByIdAndDelete({ _id: id })
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(403).json({ msg: "Forbidden, cannot do the action" });
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