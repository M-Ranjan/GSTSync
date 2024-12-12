const express = require('express');
const router = express.Router();
const { signUp, getUserByGstin, signIn } = require('../controllers/UserSignupDATA');

// Route for user signup
router.post("/signup", signUp);

// Route for user signip
router.post("/signin", signIn);

// Route to get user credentials by GSTIN
router.get("/user/:gstin", getUserByGstin);

module.exports = router;
