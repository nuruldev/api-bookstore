const express = require("express");
const router = express.Router();
const profileController = require("../controller/profileController");
const passport = require("passport");
const { upload } = require("../middleware/upload");
const { profileCheck } = require("../utils/validation");
const isLogin = passport.authenticate("jwt", {session: false})

router.use(upload.single("picture"))
/* GET users listing. */
router.get("/", isLogin, profileController.findById);
router.post("/update", isLogin, profileCheck(), profileController.update);

module.exports = router;
