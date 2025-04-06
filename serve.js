require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// Import routes
const authRoutes = require('./routes/auth');
const digestRoutes = require('./routes/digest');
const userRoutes = require('./routes/user');

// Initialize app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = require('./config/db');
mongoose.connect(db.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.log(err));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/digest', digestRoutes);
app.use('/api/user', userRoutes);

// Handle frontend routes (for SPA-like behavior)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));