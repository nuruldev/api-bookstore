const express = require("express");
const router = express.Router();
const bookController = require("../controller/bookController");
const { bookCheck } = require("../utils/validation");
const {upload} = require("../middleware/upload")

router.use(upload.single("foto"))

/* GET users listing. */
router.get("/", bookController.findAll);
router.get("/:id", bookController.findById);
router.post("/create", bookCheck(), bookController.create);
router.put("/update/:id", bookCheck(), bookController.update);
router.delete("/delete/:id", bookCheck(), bookController.delete);

module.exports = router;
