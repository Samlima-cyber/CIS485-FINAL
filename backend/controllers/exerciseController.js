const Exercise = require('../models/Exercise');

// POST /api/exercises — create a new exercise
exports.createExercise = async (req, res) => {
  try {
    const newExercise = await Exercise.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(newExercise);
  } catch (err) {
    console.error("❌ Error creating exercise:", err.message);
    res.status(500).json({ message: err.message });
  }
};

// GET /api/exercises — get all exercises
exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find().populate("createdBy", "username");
    res.status(200).json(exercises);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET /api/exercises/:id — get one exercise
exports.getSingleExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });
    res.status(200).json(exercise);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PUT /api/exercises/:id — update an exercise
exports.updateExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    if (exercise.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update" });
    }

    const updated = await Exercise.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/exercises/:id — delete an exercise
exports.deleteExercise = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) return res.status(404).json({ message: "Exercise not found" });

    if (exercise.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to delete" });
    }

    await exercise.deleteOne();
    res.status(200).json({ message: "Exercise deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};