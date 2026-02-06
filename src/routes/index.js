const express = require('express');
const router = express.Router();
const task = require('../services/taskService');

// Home route
router.get('/', async (req, res) => {
  // const page = req.body?.page ?? 0; // Default to page 0 if no page provided (i like this one)
  const page = req.query.page ?? 1;

  if (page < 1) {
    return res.redirect('/?page=1');
  }

  const response = await fetch("http://localhost:3000/api/user", {
     headers: {
       cookie: req.headers.cookie 
      } 
    });

  const user = await response.json();
  
  if(user.success === false) {
    return res.redirect('/login');
  }

  const task_data = await task.getTask(page - 1, req.headers.cookie);

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
    task_data: task_data,
    user: user.data[0],
  });
});

// Home route
router.get('/add', async(req, res) => {
  const user = await(await fetch("http://localhost:3000/api/user", {
    headers: {
      cookie: req.headers.cookie
    }
  })).json();

  if(user.success === false) {
    return res.redirect('/login');
  }

  res.render('layouts/main-layout', { 
    page: '../pages/add-task',
    title: 'Add Task',
    page_style: 'add-task',
    user: user.data[0],
  });
});

// Login route
router.get('/login', (req, res) => {
  res.render('layouts/login-layout');
});

// Profile route
router.get('/profile', async (req, res) => {
  const user = await(await fetch("http://localhost:3000/api/user", {
    headers: {
      cookie: req.headers.cookie
    }
  })).json();

  if(user.success === false) {
    return res.redirect('/login');
  }

  res.render('layouts/main-layout', {
    page: '../pages/profile',
    title: 'Profile',
    page_style: 'profile',
    user: user.data[0],
  });
});

module.exports = router;