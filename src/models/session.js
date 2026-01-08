const pool = require('../configs/database');

class Session{
    createSession = async(id, user_id, expires_at, created_at) => {
        const [rows, fields] = await pool.query('INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?)', [id, user_id, expires_at, created_at]);
    }

    getUserIdBySessionId = async (id) => {
        const [rows, fields] = await pool.query('SELECT user_id FROM sessions WHERE id = ?', [id]);
        return rows;
    }

    checkSessionStatus = async (id) => {
        const [rows, fields] = await pool.query('SELECT expires_at, created_at FROM sessions WHERE id = ?', [id]);
        return rows;
    }

    deleteSession = async (id) => {
        const [rows, fields] = await pool.query('DELETE FROM sessions WHERE id = ?', [id]);
        return rows;
    }
}

module.exports = new Session();