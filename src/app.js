const express = require('express');
const app = express();
const path = require('path');

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory path
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory

// Import routes
const indexRoutes = require('./routes/index');

// Use routes
app.use('/', indexRoutes);

// 404 handler
app.use('/', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;