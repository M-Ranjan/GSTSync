const express = require('express');
const router = express.Router();
const { signUp } = require('../controllers/UserSignupDATA');

// Route for user signup
router.post("/signup", signUp);

module.exports = router;
