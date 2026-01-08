const pool = require('../configs/database');

class User {
    getUserDetail = async (id) => {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
        return rows;
    }

    createUser = async (id, name, email, image_link) => {
        const [rows, fields] = await pool.query('INSERT INTO users (id, name, email, image_link) VALUES (?, ?, ?, ?)', [id, name, email, image_link]);
        return rows;
    }

    checkEmail = async (email) => {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows;
    }

    deleteUser = async (id) => {
        const [rows, fields] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return rows;
    }
}

module.exports = new User();