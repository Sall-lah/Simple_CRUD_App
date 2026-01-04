const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser")

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory path
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(cookieParser()) // parse cookie

// Import routes
const indexRoutes = require('./routes/index');

// Google Oauth Routes
app.use('/auth', require('./routes/Oauth'));

// API Routes
app.use('/api/task', require('./routes/taskRoutes'));

// Use routes
app.use('/', indexRoutes);

// 404 handler
app.use('/', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;