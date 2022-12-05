const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");
const userController = require("../controller/userController");
const { registerCheck, loginCheck } = require("../utils/validation");
const passport = require("passport")
const isLogin = passport.authenticate("jwt", {session: false})

/* GET users listing. */
router.get("/", isLogin, userController.findAll);
router.delete("/delete/:id", isLogin, userController.delete);

/* Register users */
router.post("/register", registerCheck(), authController.register);
/* Login users */
router.post("/login", loginCheck(), authController.login);

module.exports = router;
