const Product = require("../models/ProductSchema");
const UserSignUpCredential = require("../models/UserSignUpSchema");

// POST: Add a new product
const addProduct = async (req, res) => {
  try {
    const { gstin, name, price, stock } = req.body; // Assuming the body contains a single product

    // Find the user by gstin to get the ObjectId
    const user = await UserSignUpCredential.findOne({ gstin });
    if (!user) {
      return res
        .status(400)
        .json({ message: `User not found for GSTIN: ${gstin}` });
    }

    // Create a new product using the user's ObjectId as gstin reference
    const newProduct = new Product({
      gstin: user._id, // Store the ObjectId of the user here
      name,
      price,
      stock,
    });

    await newProduct.save();

    // Respond with a success message and the added product
    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// GET: Retrieve all products for a user
const getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate("gstin", "gstin"); // Populating the gstin field with user data

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

module.exports = { addProduct, getProducts };
