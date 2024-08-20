const express = require('express');
const router = express.Router();
const {createUserCredentials} = require("../controllers/UserGSTDATA");

router.post('/credentials', createUserCredentials);

module.exports = router;