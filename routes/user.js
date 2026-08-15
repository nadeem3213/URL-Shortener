//auth
const express= require('express');
const { handleUserSignup , handleUserLogin, handleUserLogout }=require('../controllers/user')
const router = express.Router();

// router.get('/signup', (req, res) => {
//     return res.render('signup');
// });

// router.get('/login', (req, res) => {
//     return res.render('login');
// });

router.post("/", handleUserSignup);
router.post("/login", handleUserLogin);
router.get("/logout", handleUserLogout);

module.exports = router;