const User = require("../models/user.model");
const crypto = require("crypto");

// Helper function to generate UPI ID
const generateUPI = () => crypto.randomBytes(8).toString("hex");

// Sign Up
exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  const upiId = generateUPI();
  try {
    const newUser = new User({ name, email, password, upiId });
    await newUser.save();
    res.status(201).json({ message: "User created", upiId });
  } catch (error) {
    res.status(500).json({ error: "Error creating user" });
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email, password });
    if (user) {
      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(400).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error logging in" });
  }
};
