const pool = require('../configs/database');

class Task {
    async findAllTask() {
        const [rows, fields] = await pool.query('SELECT * FROM tasks');
        console.log(fields);
        return rows;
    }
    async findPagination(page) {
        const [rows, fields] = await pool.query('SELECT * FROM users LIMIT 10 OFFSET ?', [page]);
        console.log(fields);
        return rows;
    }
}

module.exports = new Task();