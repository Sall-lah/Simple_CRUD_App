const Task = require('../models/taskModel');

class TaskController {
  getTask = async(req, res) => {
    try {
      const tasks = await Task.findAllTask();

      if (!tasks.data){
        throw new Error('No Task Found');
      }

      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }

  async getTaskPagination(req, res) {
    try {
      const page = req.params.page;
      const tasks = await Task.findAllTask(page);

      if (!tasks.data){
        throw new Error('No Task Found');
      }
      
      res.json({ success: true, data: tasks });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
}

module.exports = new TaskController();