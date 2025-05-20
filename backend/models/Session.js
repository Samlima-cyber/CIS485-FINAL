const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  style: { type: String, required: true }, // e.g., Muay Thai, BJJ, Boxing
  level: { type: String, required: true }, // beginner, intermediate, advanced
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Session', sessionSchema);