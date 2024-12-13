const jwt = require("jsonwebtoken");
const User = require("../models/UserSignUpSchema");

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Expecting 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.gstin = user.gstin; // Attach gstin to the request
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token", error });
  }
};

module.exports = authenticate;
