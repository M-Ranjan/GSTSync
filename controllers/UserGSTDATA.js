const userCredentials = require("../models/UserAuthSchema")

const createUserCredentials = async (req, res) => {
    try {
        const {
            gstin,
            tradeName,
            legalName,
            address1,
            address2,
            stateCode,
            pinCode,
            txpType,
            status,
            blkStatus
        } = req.body;

        const newUser = new userCredentials({
            gstin,
            tradeName,
            legalName,
            address1,
            address2,
            stateCode,
            pinCode,
            txpType,
            status,
            blkStatus,
        });

        await newUser.save();
        res.status(201).json({ message: 'User credentials saved successfully!' });
    } catch (error) {
        console.error('Error saving user credentials:', error);
        if (error.code === 11000) {
            res.status(400).json({ error: 'GSTIN already exists.' });
        } else {
            res.status(500).json({ error: 'Failed to save user credentials' });
        }
    }
}

module.exports = {createUserCredentials};