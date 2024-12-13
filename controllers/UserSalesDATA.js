const Sales = require("../models/UserSalesSchema");

// POST: Add a new sales record
const addSale = async (req, res) => {
    try {
        console.log("Received GSTIN:", req.gstin);

        const { customerName, grandTotal, products } = req.body;

        // Validate products array
        if (!Array.isArray(products) || products.length === 0) {
            return res.status(400).json({ message: "Products array is required" });
        }

        // Validate stock for each product
        for (let product of products) {
            if (product.quantity > product.stock) {
                return res.status(400).json({
                    message: `Requested quantity for product '${product.name}' exceeds stock.`,
                });
            }
        }

        const newSale = new Sales({
            gstin: req.gstin, // Comes from the middleware
            customerName,
            grandTotal,
            products,
        });

        await newSale.save();
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
