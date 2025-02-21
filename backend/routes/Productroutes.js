const express = require("express");
const { getAllProducts, getProductById, getRelatedProducts } = require('../controllers/Productcontroller');

const router = express.Router();

router.get("/", getAllProducts);
router.get("/:id", getProductById);
router.get("/related/:productId", getRelatedProducts);

module.exports = router;
