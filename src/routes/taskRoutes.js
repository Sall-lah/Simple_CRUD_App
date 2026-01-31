const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');
const requireAuth = require('../middlewares/authMiddleware');

// // Get All Tasks
// router.get('/', TaskController.getTask);
// // Get Task by Id
// router.get('/:taskId', TaskController.getTaskbyId);
// Get Task Pagination
router.get('/:page', requireAuth, TaskController.getTaskPagination);
// Create Task
router.post('/add', requireAuth, TaskController.addTask);
// Update Task
router.put('/update', requireAuth, TaskController.updateTask);
// Delete Task
router.delete('/delete', requireAuth, TaskController.deleteTask);

module.exports = router;