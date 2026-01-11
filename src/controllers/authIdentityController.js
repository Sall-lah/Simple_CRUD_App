// Taro di Tiap Provider masing masing
// Bukan di controller

const AuthIdentity = require('../models/authIdentityModel');
const { randomUUID } = require("crypto");

class AuthIdentityController {
    deleteAuthIdentity = async (req, res) => {
        try{
            const { authId } = req.body;
            const response = await AuthIdentity.deleteAuthIdentity(authId);
            res.json({ success: true, data: response });
        } catch(error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    createAuthIdentity = async (req, res) => {
        try{
            const authId = randomUUID();
            const { userId } = req.body;
            const response = await AuthIdentity.createAuthIdentity(authId, userId);
            res.json({ success: true, data: response });
        } catch(error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    getUserId = async (req, res) => {
        try{
            const { authId } = req.body;
            const response = await AuthIdentity.getUserId(authId);
            res.json({ success: true, data: response });
        } catch(error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new AuthIdentityController();