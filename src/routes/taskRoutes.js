const express = require('express');
const router = express.Router();
const TaskController = require('../controllers/taskController');

// Get All Tasks
router.get('/', TaskController.getTask);
// Get Task Pagination
router.get('/:page', TaskController.getTaskPagination);

module.exports = router;