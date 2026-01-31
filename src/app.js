const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require("cookie-parser")
// const cors = require("cors");

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.set('view engine', 'ejs'); // Set EJS as the view engine
app.set('views', path.join(__dirname, 'views')); // Set the views directory path
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.use(cookieParser()) // parse cookie
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true,               // ALLOW cookies
// }));


// Authentication routes
app.use('/auth', require('./routes/authRoutes'));

// API routes
app.use('/api/task', require('./routes/taskRoutes'));

// View routes
app.use('/', require('./routes/index'));

// 404 handler (Incase Error Appears)
app.use('/', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

module.exports = app;