const express = require("express");
const {
  saveProduct,
  getProduct,
  getAll,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");
const { upload } = require("../middlewares/multer");
const router = express.Router();

router.get("/", getAll);
router.get("/:id", getProduct);
router.put("/:id", updateProduct);
router.post("/save", upload.single("file"), saveProduct);
router.delete("/:id", deleteProduct);

module.exports = router;
