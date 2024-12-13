const bcrypt = require("bcryptjs");
const UserSignUpCredential = require("../models/UserSignUpSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
  try {
    const { gstin, password } = req.body;

    // Check if user already exists
    const existingUser = await UserSignUpCredential.findOne({ gstin });
    if (existingUser) {
      return res.status(400).json({ message: "GSTIN already in use" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // Using 10 salt rounds

    // Create a new user
    const newUser = new UserSignUpCredential({
      gstin,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { userId: newUser._id, gstin: user.gstin },
      process.env.SECRET_KEY,
      { expiresIn: "10h" }
    );

    // Respond with success message and token
    res.status(201).json({ message: "User registered successfully", token });
  } catch (error) {
    console.error("Error signing up:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Sign In (Login)
const signIn = async (req, res) => {
  try {
    const { gstin, password } = req.body;

    // Find the user by GSTIN
    const user = await UserSignUpCredential.findOne({ gstin });
    if (!user) {
      return res.status(400).json({ message: "Invalid GSTIN or password" });
    }

    // Compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid GSTIN or password" });
    }

    // Generate JWT Token
    const token = jwt.sign(
      { userId: user._id, gstin: user.gstin },
      process.env.SECRET_KEY, // Secret key for JWT (you can change this)
      { expiresIn: "10h" } // Token expiration time (1 hour)
    );

    // Respond with the token and success message
    res.status(200).json({
      message: "Login successful",
      token, // Return the JWT token
    });
  } catch (error) {
    console.error("Error signing in:", error);
    res.status(500).json({ message: "Server error. Please try again later." });
  }
};

// Fetch user credentials by GSTIN (as an ObjectId reference)
const getUserByGstin = async (req, res) => {
  try {
    const gstin = req.params.gstin;

    // Find the user by the GSTIN
    const user = await userCredentials.findOne({ gstin });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user credentials:", error);
    res.status(500).json({ error: "Failed to fetch user credentials" });
  }
};

module.exports = { signUp, signIn, getUserByGstin };
