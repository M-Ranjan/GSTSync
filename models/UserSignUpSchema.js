const mongoose = require('mongoose');

const userSignUpSchema = new mongoose.Schema({
    gstin: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

const UserSignUpCredential = mongoose.model('UserSignUpCredential', userSignUpSchema);

module.exports = UserSignUpCredential;
