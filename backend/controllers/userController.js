const User = require('../models/User');
const jwt = require('jsonwebtoken');

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return res.status(400).json({ message: "Email is already registered" });
      }
      if (existingUser.username === username) {
        return res.status(400).json({ message: "Username is already taken" });
      }
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email
    });
  } catch (err) {
    console.error("❌ Error in registerUser:", err);
    res.status(500).json({ message: err.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email not found" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token
    });
  } catch (err) {
    console.error("❌ Error in loginUser:", err);
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  registerUser,
  loginUser
};