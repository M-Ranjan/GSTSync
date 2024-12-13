const express = require("express");
const { addProduct, getProducts } = require("../controllers/UserProductDATA");
const authenticate = require("../middlewares/Authentication");

const router = express.Router();

router.post("/add-product", authenticate, addProduct);
router.get("/get-products", authenticate, getProducts);

module.exports = router;
