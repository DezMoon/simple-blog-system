const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Adjust path if model is in a different directory

const secretKey = process.env.JWT_SECRET_KEY; // Set a secret key for token signing

// Register endpoint
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, email, password: hashedPassword });
    const savedUser = await user.save();

    res.json({ message: "User registered successfully", user: savedUser._id });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Login endpoint
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put("/profile", async (req, res) => {
  try {
    const { firstName, lastName, password } = req.body;
    const userId = req.user._id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName },
      { new: true }
    );

    if (password) {
      // Update password logic if needed
    }

    res.json({ message: "Profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
