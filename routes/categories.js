const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { categoryCheck } = require("../utils/validation");

/* GET users listing. */
router.get("/", categoryController.findAll);
router.get("/:id", categoryController.findById);
router.post("/create", categoryCheck(), categoryController.create);
// router.post("/create", categoryController.create);
router.put("/update/:id", categoryController.update);
router.delete("/delete/:id", categoryController.delete);

module.exports = router;
