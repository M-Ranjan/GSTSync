const Sales = require("../models/UserSalesSchema");
const Product = require("../models/ProductSchema");

// POST: Add a new sales record
const addSale = async (req, res) => {
    try {
        const { customerName, grandTotal, products } = req.body;

        // Validate products array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Products array is required" });
        }

        // Validate stock for each product
        for (let product of products) {
            const dbProduct = await Product.findById(product._id); // Fetch product from DB
            if (!dbProduct) {
                return res.status(400).json({
                    message: `Product with ID '${product._id}' not found.`,
                });
            }

            // Check if requested quantity exceeds stock
            if (product.quantity > dbProduct.stock) {
                return res.status(400).json({
                    message: `Requested quantity for product '${dbProduct.name}' exceeds stock.`,
                });
            }
        }

        // Create new sales record
        const newSale = new Sales({
            gstin: req.gstin, // Comes from the middleware
            customerName,
            grandTotal,
            products,
        });

        // Save the sale to the database
        await newSale.save();

        // Reduce the stock for each product in the sale
        for (let product of products) {
            const dbProduct = await Product.findById(product._id);
            dbProduct.stock -= product.quantity; // Reduce stock by the sold quantity
            await dbProduct.save(); // Save the updated product stock
        }

        res.status(201).json({ message: "Sale added successfully", sale: newSale });
    } catch (error) {
        console.error("Error adding sale:", error);
        res.status(500).json({ message: "Error adding sale", error });
    }
};

// GET: Retrieve all sales for the authenticated user
const getSales = async (req, res) => {
    try {
        const sales = await Sales.find({ gstin: req.gstin });
        res.status(200).json({ sales });
    } catch (error) {
        console.error("Error fetching sales:", error);
        res.status(500).json({ message: "Error fetching sales", error });
    }
};

module.exports = { addSale, getSales };
