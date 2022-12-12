const express = require('express');
const router = express.Router();
const passport = require("passport")
const isLogin = passport.authenticate("jwt", {session: false})
const indexController = require("../controller/indexController")

/* GET home page. */
router.get('/token', isLogin,  indexController.getToken);

module.exports = router;
