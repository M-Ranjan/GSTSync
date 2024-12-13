const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  gstin: {
    type: mongoose.Schema.Types.ObjectId,  // Use ObjectId to reference UserSignUpCredential
    required: true,
    ref: 'UserSignUpCredential'  // This tells Mongoose to expect an ObjectId from the UserSignUpCredential model
  },
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number,
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
