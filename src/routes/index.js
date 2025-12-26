const express = require('express');
const router = express.Router();

// Home route
router.get('/', (req, res) => {
  res.render('layouts/main-layout', { 
    page: '../pages/todos',
    title: 'Todos',
    page_style: 'todos',
  });
});

// Home route
router.get('/add', (req, res) => {
  res.render('layouts/main-layout', { 
    page: '../pages/add-task',
    title: 'Add Task',
    page_style: 'add-task',
  });
});

module.exports = router;