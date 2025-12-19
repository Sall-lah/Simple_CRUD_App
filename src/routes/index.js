const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('layouts/main-layout', { 
    page: '../pages/home',
  });
});

module.exports = router;