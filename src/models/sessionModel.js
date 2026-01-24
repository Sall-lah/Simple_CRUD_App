const pool = require('../configs/database');

class Session{
    createSession = async(id, user_id, expires_at, created_at) => {
        const [rows, fields] = await pool.query('INSERT INTO sessions (id, user_id, expires_at, created_at) VALUES (?, ?, ?, ?)', [id, user_id, expires_at, created_at]);
    }

    getUserIdBySessionId = async (id) => {
        const [rows, fields] = await pool.query('SELECT user_id, expires_at FROM sessions WHERE id = ? AND expires_at > NOW()', [id]);
        return rows;
    }

    updateSession = async (id) => {
        const [rows, fields] = await pool.query('UPDATE sessions SET expires_at = NOW() + INTERVAL 1 DAY WHERE id = ?', [id]);
        return rows;
    }

    deleteSession = async (id) => {
        const [rows, fields] = await pool.query('DELETE FROM sessions WHERE id = ?', [id]);
        return rows;
    }
}

module.exports = new Session();