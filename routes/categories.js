const express = require("express");
const passport = require("passport");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { categoryCheck } = require("../utils/validation");
const isLogin = passport.authenticate("jwt", { session: false });

/* GET categories listing. */
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findById);
router.post("/create", isLogin, categoryCheck(), categoryController.create);
// router.post("/create", categoryController.create);
router.put("/update/:id", isLogin, categoryController.update);
router.delete("/delete/:id", isLogin, categoryController.delete);

module.exports = router;
