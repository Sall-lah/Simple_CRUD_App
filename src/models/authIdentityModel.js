const pool = require('../configs/database');

class AuthIdentity {
    // Warning 3rd party provider only :P
    createAuthIdentity = async (id, user_id, provider, provider_id) => {
        const [rows, fields] = await pool.query('INSERT INTO auth_identities (id, user_id, provider, provider_id) VALUES (?, ?, ?, ?)',
            [id, user_id, provider, provider_id]);
        return rows;
    }
    
    getUserIdByProviderId = async (providerId, provider) => {
        const [rows, fields] = await pool.query('SELECT user_id FROM auth_identities WHERE provider_id = ? AND provider = ?',
            [providerId, provider]);
        return rows;
    }

    deleteAuthIdentity = async (id) => {
        const [rows, fields] = await pool.query('DELETE FROM auth_identities WHERE id = ?',
            [id]);
        return rows;
    }
}

module.exports = new AuthIdentity();



