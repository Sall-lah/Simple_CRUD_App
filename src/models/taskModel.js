const pool = require('../configs/database');

class Task {
    async findAllTask(user_id) {
        const [rows, fields] = await pool.query('SELECT * FROM tasks WHERE user_id = ?', [user_id]);
        // console.log(fields);
        return rows;
    }

    findTaskById = async(user_id, taskId) => {
        const [rows, fields] = await pool.query('SELECT * FROM tasks WHERE user_id = ? AND id = ?', [user_id, taskId]);
        // console.log(fields);
        return rows;
    }

    async findPagination(user_id, page) {
        // Naive Pagination (without last page)
        const [rows, fields] = await pool.query('SELECT * FROM tasks WHERE user_id = ? LIMIT 10 OFFSET ?', [user_id, page * 10]);
        // console.log(fields);
        return rows;
    }

    pageCount = async(user_id) => {
        // You can set limit
        const [rows] = await pool.query('SELECT COUNT(*) as count FROM tasks WHERE user_id = ?', [user_id]);
        const count = rows[0].count;
        const pageCount = Math.ceil(count / 10);
        return {pageCount, count};
    }

    createTask = async(id, user_id, title, description, due_date) => {
        const [rows] = await pool.query(
            'INSERT INTO tasks (id, user_id, title, description, due_date) VALUES (?, ?, ?, ?, ?)',
            [id, user_id, title, description, due_date]
        );
        return rows;
    }

    updateTask = async(id, user_id, title, description, due_date, status) => {
        // add search by id
        const [rows] = await pool.query(
            'UPDATE tasks SET title = ?, description = ?, due_date = ?, status = ? WHERE id = ? AND user_id = ?',
            [title, description, due_date, status, id, user_id]
        );
        return rows;
    }

    deleteTask = async(id, user_id) => {
        const [rows] = await pool.query(
            'DELETE FROM tasks WHERE id = ? AND user_id = ?',
            [id, user_id]
        );
        return rows;
    }
}

module.exports = new Task();