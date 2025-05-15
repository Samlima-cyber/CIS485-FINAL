const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

// Test route
app.get('/', (req, res) => {
  console.log("GET / request received");
  res.set('Content-Type', 'text/plain');
  res.send('Kumite Buddy API is running with MongoDB');
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB connection error:", err));

// 🧩 Step 5: Add this line to hook up your user routes
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// Start server
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});