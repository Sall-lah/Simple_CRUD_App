const Task = require('../models/taskModel');

class TaskController {
  getTask = async(req, res) => {
    try {
      const tasks = await Task.findAllTask();

      if (tasks.length === 0){
        throw new Error('No Task Found');
      }

      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  getTaskbyId = async(req, res) => {
    try {
      const taskId = req.params.taskId;
      const task = await Task.findTaskById(taskId);

      if (tasks.length === 0){
        throw new Error('No Task Found');
      }
      
      res.json({ success: true, data: task });
    }
    catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getTaskPagination(req, res) {
    try {
      const page = parseInt(req.params.page);
      const tasks = await Task.findPagination(page);
      const {pageCount, count}  = await Task.pageCount();

      res.json({ success: true, data: {tasks: tasks, page: page + 1, pageCount: pageCount, count: count}});
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  addTask = async (req, res) => {
    try {
      const { taskName, taskDescription, dueDate } = await req.body;
      const response = await Task.createTask(taskName, taskDescription, dueDate);
      res.json({ success: true, data: response });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  updateTask = async (req, res) => {
    try {
      const {taskId, taskName, taskDescription, dueDate, isCompleted} = await req.body;
      const response = await Task.updateTask(taskId, taskName, taskDescription, dueDate, isCompleted);
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
      const {taskId} = await req.body;
      const response = await Task.deleteTask(taskId);
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