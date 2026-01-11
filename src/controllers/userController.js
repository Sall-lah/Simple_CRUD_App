const User = require('../models/userModel');
const { randomUUID } = require("crypto");

class UserController {
    checkEmail = async (req, res) => {
        try {
            const email = req.body.email;
            const response = await User.checkEmail(email);

            res.json({ success: true, data: response });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    getUserDetail = async (req, res) => {
        try {
            const userId = req.userId;
            const response = await User.getUserDetail(userId);

            res.json({ success: true, data: response });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    createUser = async (req, res) => {
        try{
            const userId = randomUUID();
            const { name, email, image_link } = req.body;
            const [rows, fields] = await User.createUser(userId, name, email, image_link);

            res.json({ success: true, data: rows });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    updateUserDetail = async (req, res) => {
        try{
            const userId = req.userId;
            const { name, email, image_link } = req.body;
            const [rows, fields] = await User.updateUserDetail(userId, name, email, image_link);

            res.json({ success: true, data: rows });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    deleteUser = async (req, res) => {
        try{
            const userId = req.userId;
            const [rows, fields] = await User.deleteUser(userId);

            res.json({ success: true, data: rows });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new UserController();