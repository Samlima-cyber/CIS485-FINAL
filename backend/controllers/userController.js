const jwt = require('jsonwebtoken'); // <-- add this at the top

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // ✅ generate JWT token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      token  // <-- send token to frontend
    });
  } catch (err) {
    console.error("❌ Error in loginUser:", err);
    res.status(500).json({ message: err.message });
  }
};