const express = require('express');
const router = express.Router();
const task = require('../services/taskService');
const requireAuth = require('../middlewares/authMiddleware');

// Home route
router.get('/', requireAuth, async (req, res) => {
  // const page = req.body?.page ?? 0; // Default to page 0 if no page provided (i like this one)
  const page = req.query.page ?? 1;

  if (page < 1) {
    return res.redirect('/?page=1');
  }
  
  const task_data = await task.getTask(page - 1);
  const totalData = task_data.data.count;
  const totalPage = task_data.data.pageCount;

  // Need to rework pagination query
  if ((page > totalPage || page < 1) && totalData != 0) { 
    return res.redirect('/?page=1');
  }
  return res.render('layouts/main-layout', {
    page: '../pages/todos',
    title: 'Todos',
    page_style: 'todos',
    task_data,
  });
});

// Home route
router.get('/add', requireAuth, (req, res) => {
  res.render('layouts/main-layout', { 
    page: '../pages/add-task',
    title: 'Add Task',
    page_style: 'add-task',
  });
});

// Login route
router.get('/login', (req, res) => {
  console.log(req.cookies);
  res.render('layouts/login-layout');
});

module.exports = router;