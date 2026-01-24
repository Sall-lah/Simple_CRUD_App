const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// // Get All Tasks
// router.get('/', TaskController.getTask);
// // Get Task by Id
// router.get('/:taskId', TaskController.getTaskbyId);
// Get Task Pagination
router.get('/:page', TaskController.getTaskPagination);
// Create Task
router.post('/add', TaskController.addTask);
// Update Task
router.put('/update', TaskController.updateTask);
// Delete Task
router.delete('/delete', TaskController.deleteTask);

module.exports = router;