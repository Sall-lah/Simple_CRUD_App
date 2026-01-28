const pool = require('../configs/database');

class AuthIdentity {
    // Warning 3rd party provider only :P
    createAuthIdentity = async (id, user_id, provider, provider_id) => {
        const [rows, fields] = await pool.query('INSERT INTO auth_identities (id, user_id, provider, provider_id) VALUES (?, ?, ?, ?)',
            [id, user_id, provider, provider_id]);
        return rows;
    }
    
    getUserIdByProviderId = async (provider_id, provider) => {
        const [rows, fields] = await pool.query('SELECT user_id FROM auth_identities WHERE provider_id = ? AND provider = ?',
            [provider_id, provider]);
        return rows;
    }

    getProviderIdByUserId = async (user_id, provider) => {
        const [rows, fields] = await pool.query('SELECT provider_id FROM auth_identities WHERE user_id = ? AND provider = ?',
            [user_id, provider]);
        return rows;
    }

    deleteAuthIdentity = async (id) => {
        const [rows, fields] = await pool.query('DELETE FROM auth_identities WHERE id = ?',
            [id]);
        return rows;
    }
}

module.exports = new AuthIdentity();



