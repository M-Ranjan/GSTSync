require('dotenv').config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const userAuthRoutes = require("./routes/userAuthPost");
const userAuthSignUpRoutes = require("./routes/userAuthSignupPost")

const app = express();

// Middleware
app.use(express.json()); // Built-in middleware for JSON
app.use(cors({
    origin: ['https://gstsync.onrender.com', 'http://localhost:5173'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));


app.use('/user', userAuthRoutes);
app.use('/auth', userAuthSignUpRoutes)

connectDB();

// Start the server
const PORT = process.env.PORT || 5000; // Provide a default value for PORT
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
