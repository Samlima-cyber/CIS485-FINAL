const express = require('express');
const router = express.Router();
const { registerUser, loginUser } = require('../controllers/userController');
const protect = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser);

// 🔒 Protected route
router.get('/me', protect, (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;