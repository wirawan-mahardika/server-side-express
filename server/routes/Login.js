const { login, refreshToken, signup, logout, getme } = require('../controllers/userController')
const router = require('express').Router()

router.post('/login', login)
router.post('/signup', signup)
router.get('/refreshToken', refreshToken)
router.delete('/logout', logout)
router.get('/getme', getme)
router.get("/getme", (req, res) => {
  res.cookie("asdf", "asdf", {
    maxAge,
  });
});


module.exports = router