const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.json({ message: 'Welcome to our API!' });
});

// About route
router.get('/about', (req, res) => {
  res.json({ 
    message: 'About page',
    version: '1.0.0',
    author: 'Your Name'
  });
});

// Contact route with POST
router.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  
  res.json({ 
    success: true, 
    message: 'Contact form submitted successfully',
    data: { name, email, message }
  });
});

module.exports = router;