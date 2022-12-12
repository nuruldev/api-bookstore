const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const { bookCheck } = require("../utils/validation");
const {upload} = require("../middleware/upload");
const passport = require("passport");
const isLogin = passport.authenticate("jwt", { session: false });

router.use(upload.single("foto"))

/* GET users listing. */
router.get("/", bookController.findAll);
router.get("/:id", isLogin, bookController.findById);
router.post("/create", isLogin, bookCheck(), bookController.create);
router.put("/update/:id", isLogin, bookCheck(), bookController.update);
router.delete("/delete/:id", isLogin, bookCheck(), bookController.delete);

module.exports = router;
