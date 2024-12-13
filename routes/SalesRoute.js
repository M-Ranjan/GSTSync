const express = require("express");
const { addSale, getSales } = require("../controllers/UserSalesDATA");
const authenticate = require("../middlewares/Authentication");

const router = express.Router();

router.post("/add", authenticate, addSale); // Add a sales record
router.get("/", authenticate, getSales);    // Get all sales for the user

module.exports = router;
