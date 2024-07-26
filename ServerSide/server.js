const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // Built-in middleware for JSON

// Connect to the database
connectDB();

// Start the server
const PORT = process.env.PORT || 5000; // Provide a default value for PORT
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
