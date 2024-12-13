const mongoose = require("mongoose");

const salesSchema = new mongoose.Schema({
  gstin: {
    type: String, // Reference to UserSignUpCredential schema
    required: true,
    ref: "UserSignUpSchema",
  },
  customerName: {
    type: String,
    required: true,
  },
  grandTotal: {
    type: Number,
    required: true,
  },
  products: [
    {
      _id: { type: mongoose.Schema.Types.ObjectId, required: true }, // MongoDB ObjectId for product
      name: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      stock: { type: Number, required: true },
    },
  ],
});

// Add indexes for faster queries
salesSchema.index({ gstin: 1 });

const Sales = mongoose.model("Sales", salesSchema);
module.exports = Sales;
