const Task = require('../models/taskModel');
const { randomUUID } = require("crypto");

class TaskController {
  getTaskPagination = async(req, res) => {
    try {
      const userId = req.userId;
      const { page } = parseInt(req.params);
      const tasks = await Task.displayTask(userId, page);
      const { pageCount, count }  = await Task.pageCount(userId);

      res.json({ success: true, data: {tasks: tasks, page: page + 1, pageCount: pageCount, count: count}});
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  addTask = async (req, res) => {
    try {
      const userId = req.userId;
      const { title, description, dueDate } = await req.body;
      const taskId = randomUUID();
      const response = await Task.createTask(taskId, userId, title, description, dueDate);
      res.json({ success: true, data: response });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  updateTask = async (req, res) => {
    try {
      const userId = req.userId;
      const {taskId, title, description, dueDate, status} = await req.body;
      const response = await Task.updateTask(taskId, userId, title, description, dueDate, status);
      if(response.affectedRows === 0){
        throw new Error('Task not Found');
      }
      res.json({ success: true, data: response });
    } catch(error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  deleteTask = async(req, res) => {
    try {
      const userId = req.userId;
      const { taskId } = await req.body;
      const response = await Task.deleteTask(taskId, userId);
      if(response.affectedRows === 0){
        throw new Error('Task not Found');
      }
      res.json({ success: true, data: response });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new TaskController();