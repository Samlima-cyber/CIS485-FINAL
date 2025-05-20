const Session = require('../models/Session');

exports.createSession = async (req, res) => {
  try {
    const newSession = await Session.create({
      ...req.body,
      createdBy: req.user._id
    });
    res.status(201).json(newSession);
  } catch (err) {
    console.error("❌ Error creating session:", err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.getSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("createdBy", "username");
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getSingleSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) return res.status(404).json({ message: "Session not found" });
    res.status(200).json(session);
  } catch (err) {
    console.error("❌ Error fetching session:", err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.updateSession = async (req, res) => {
  try {
    const session = await Session.findById(req.params.id);
    if (!session) {
      return res.status(404).json({ message: "Session not found" });
    }

    if (session.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "Not authorized to update this session" });
    }

    const updated = await Session.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updated);
  } catch (err) {
    console.error("❌ Error updating session:", err.message);
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSession = async (req, res) => {
    try {
      const session = await Session.findById(req.params.id);
      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }
  
      // Make sure only the creator can delete it
      if (session.createdBy.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: "Not authorized to delete this session" });
      }
  
      await session.deleteOne(); // ✅ replaces deprecated .remove()
      res.status(200).json({ message: "Session deleted" });
    } catch (err) {
      console.error("❌ Error deleting session:", err.message);
      res.status(500).json({ message: err.message });
    }
  };  