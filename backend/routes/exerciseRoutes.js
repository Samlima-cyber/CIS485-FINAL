const express = require('express');
const router = express.Router();
const {
  createExercise,
  getExercises,
  getSingleExercise,
  updateExercise,
  deleteExercise
} = require('../controllers/exerciseController');
const protect = require('../middleware/authMiddleware');

// Public routes
router.get('/', getExercises);
router.get('/:id', getSingleExercise);

// Protected routes
router.post('/', protect, createExercise);
router.put('/:id', protect, updateExercise);
router.delete('/:id', protect, deleteExercise);

module.exports = router;