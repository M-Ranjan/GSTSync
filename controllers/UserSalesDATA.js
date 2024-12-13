// const Sales = require("../models/UserSalesSchema");

// // POST: Add a new sales record
// const addSale = async (req, res) => {
//     try {
//         const { customerName, grandTotal, products } = req.body;

//         const newSale = new Sales({
//             gstin: req.gstin, // Comes from the middleware
//             customerName,
//             grandTotal,
//             products,
//         });

//         await newSale.save();
//         res.status(201).json({ message: "Sale added successfully", sale: newSale });
//     } catch (error) {
//         res.status(500).json({ message: "Error adding sale", error });
//     }
// };

// // GET: Retrieve all sales for the authenticated user
// const getSales = async (req, res) => {
//     try {
//         const sales = await Sales.find({ gstin: req.gstin });
//         res.status(200).json({ sales });
//     } catch (error) {
//         res.status(500).json({ message: "Error fetching sales", error });
//     }
// };

// module.exports = { addSale, getSales };
