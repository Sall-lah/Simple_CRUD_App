const express = require('express');
const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies

// Import routes
const indexRoutes = require('./routes/index');

// Use routes
app.use('/', indexRoutes);


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;