const express = require('express');
const router = express.Router();
const {
  createSession,
  getSessions,
  getSingleSession,
  updateSession,
  deleteSession
} = require('../controllers/sessionController');
const protect = require('../middleware/authMiddleware');

// Public routes
router.get('/', getSessions);
router.get('/:id', getSingleSession);

// Protected routes
router.post('/', protect, createSession);
router.put('/:id', protect, updateSession);
router.delete('/:id', protect, deleteSession);

module.exports = router;