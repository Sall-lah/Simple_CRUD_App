const pool = require('../configs/database');

class Task {
    static async findAllTask() {
        const [rows, fields] = await pool.query('SELECT * FROM tasks');
        console.log(fields);
        return rows;
    }

    findTaskById = async(taskId) => {
        const [rows, fields] = await pool.query('SELECT * FROM tasks WHERE id = ?', [taskId]);
        console.log(fields);
        return rows;
    }

    async findPagination(page) {
        const [rows, fields] = await pool.query('SELECT * FROM tasks LIMIT 10 OFFSET ?', [page * 10]);
        console.log(fields);
        return rows;
    }

    createTask = async(taskName, taskDescription, dueDate) => {
        const [rows] = await pool.query(
            'INSERT INTO tasks (task_name, task_description, due_date, is_completed) VALUES (?, ?, ?, 0)',
            [taskName, taskDescription, dueDate]
        );
        return rows;
    }

    updateTask = async(taskId, taskName, taskDescription, dueDate, isCompleted) => {
        // add search by id
        const [rows] = await pool.query(
            'UPDATE tasks SET task_name = ?, task_description = ?, due_date = ?, is_completed = ? WHERE id = ?',
            [taskName, taskDescription, dueDate, isCompleted,  taskId]
        );
        return rows;
    }

    deleteTask = async(taskId) => {
        const [rows] = await pool.query(
            'DELETE FROM tasks WHERE id = ?',
            [taskId]
        );
        return rows;
    }
}

module.exports = new Task();