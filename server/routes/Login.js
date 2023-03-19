const {
  login,
  refreshToken,
  signup,
  logout,
  getme,
  deleteUser,
  getUsers,
} = require("../controllers/userController");
const router = require("express").Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/refreshToken", refreshToken);
router.delete("/logout", logout);
router.get("/getme", getme);
router.get("/getUser", getUsers);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
