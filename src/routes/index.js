const express = require('express');
const router = express.Router();
const task = require('../repositories/taskRepository');

// Home route
router.get('/', async (req, res) => {
  // const page = req.body?.page ?? 0; // Default to page 0 if no page provided (i like this one)
  const page = req.query.page ?? 0;

  task_data = await task.getTask(page);

  // Need to rework pagination query
  if ((task_data.data.pageCount - 1) < page && task_data.data.count != 0) {
    res.redirect('/?page=0');
  }
  else {
    res.render('layouts/main-layout', {
      page: '../pages/todos',
      title: 'Todos',
      page_style: 'todos',
      task_data,
    });
  }
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