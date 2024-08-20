const mongoose = require("mongoose");

const userAuthSchema = new mongoose.Schema({
    gstin: {
        type: String,
        required:true,
        unique: true
    },
    tradeName: {
        type: String,
        required:true,
    },
    legalName: {
        type: String,
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: true,
    },
    stateCode: {
        type: Number,
        required: true,
    },
    pinCode:{
        type: Number,
        required: true,
    },
    txpType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["ACT", "CNL", "INA", "PRO"],
    },
    blkStatus: {
        type: String,
        required: true,
        enum: ['B', 'U'] 
    }
})

const userCredentials = mongoose.model("user_credentials", userAuthSchema);

module.exports = userCredentials;