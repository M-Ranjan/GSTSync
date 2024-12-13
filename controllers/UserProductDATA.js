const Product = require("../models/ProductSchema");
const UserSignUpCredential = require("../models/UserSignUpSchema");
// POST: Add a new product
const addProduct = async (req, res) => {
    try {
      const products = req.body; // Assuming the body contains an array of products
  
      // Ensure products is an array
      if (!Array.isArray(products)) {
        return res.status(400).json({ message: "Request body must be an array of products" });
      }
  
      // Iterate over each product and add them to the database
      const addedProducts = [];
  
      for (let product of products) {
        const { gstin, name, price, stock, tax } = product;
  
        // Find the user by gstin to get the ObjectId
        const user = await UserSignUpCredential.findOne({ gstin });
        if (!user) {
          return res.status(400).json({ message: `User not found for GSTIN: ${gstin}` });
        }
  
        // Create a new product using the user's ObjectId as gstin reference
        const newProduct = new Product({
          gstin: user._id,  // Store the ObjectId of the user here
          name,
          price,
          stock,
          tax
        });
  
        await newProduct.save();
        addedProducts.push(newProduct); // Push the newly added product into the array
      }
  
      // Respond with a success message and the added products
      res.status(201).json({
        message: "Products added successfully",
        products: addedProducts
      });
    } catch (error) {
      console.error("Error adding products:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

// GET: Retrieve all products for a user
const getProducts = async (req, res) => {
    try {
      const products = await Product.find().populate('gstin', 'gstin');  // Populating the gstin field with user data
  
      res.status(200).json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Server error. Please try again later." });
    }
  };

module.exports = { addProduct, getProducts };
