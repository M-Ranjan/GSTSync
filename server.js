require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userAuthSignUpRoutes = require("./routes/userAuthSignupPost")
// const salesRoutes = require("./routes/SalesRoute");
const productRoutes = require("./routes/ProductRoute");

const app = express();

// Middleware
app.use(express.json()); // Built-in middleware for JSON
app.use(cors({
  origin: ['https://gstsync.onrender.com', 'http://localhost:5173'],
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/auth', userAuthSignUpRoutes);
// app.use("/sales", salesRoutes);
app.use("/products", productRoutes)

connectDB();

// Start the server
const PORT = process.env.PORT || 5000; // Provide a default value for PORT
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
