const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true }, // no enum = accepts 'BJJ', 'Muay Thai', etc.
  description: { type: String, required: true },
  difficulty: { type: String, required: true }, // no enum = accepts anything like 'Beginner', 'Intermediate', 'Hardcore'
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Exercise', exerciseSchema);