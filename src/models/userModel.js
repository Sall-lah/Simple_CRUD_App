const pool = require('../configs/database');

class User {
    resolve = async (id) => {
        const [rows, fields] = await pool.query('SELECT id FROM users WHERE id = ?', [id]);
        return rows;
    }

    getUserDetail = async (id) => {
        const [rows, fields] = await pool.query('SELECT name, email, image_link FROM users WHERE id = ?', [id]);
        return rows;
    }

    createUser = async (id, name, email, image_link) => {
        const [rows, fields] = await pool.query('INSERT INTO users (id, name, email, image_link) VALUES (?, ?, ?, ?)', [id, name, email, image_link]);
        return id;
    }

    updateUserDetail = async (id, name, email, image_link) => {
        const [rows, fields] = await pool.query('UPDATE users SET name = ?, email = ?, image_link = ? WHERE id = ?', [name, email, image_link, id]);
        return rows;
    }

    deleteUser = async (id) => {
        const [rows, fields] = await pool.query('DELETE FROM users WHERE id = ?', [id]);
        return rows;
    }
    
    checkEmail = async (email) => {
        const [rows, fields] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
        return rows;
    }
}

module.exports = new User();