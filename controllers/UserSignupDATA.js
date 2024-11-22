const bcrypt = require('bcryptjs');
const UserSignUpCredential = require('../models/UserSignUpSchema');

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

        // Respond with success message
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Error signing up:', error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
};

module.exports = { signUp };
