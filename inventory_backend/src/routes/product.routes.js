const express = require("express");
const router = express.Router();

const productController = require("../controllers/product.controller");

router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.patch("/:id/stock", productController.updateStock);

module.exports = router;