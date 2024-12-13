const jwt = require("jsonwebtoken");
const UserSignUpCredential = require("../models/UserSignUpSchema");

const authenticate = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await UserSignUpCredential.findById(decoded.userId);
        if (!user) {
            console.log("User not found for ID:", decoded.userId);
            return res.status(404).json({ message: "User not found" });
        }

        req.gstin = user.gstin; // Attach GSTIN for downstream use
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        return res.status(403).json({ message: "Invalid token", error });
    }
};

module.exports = authenticate;
