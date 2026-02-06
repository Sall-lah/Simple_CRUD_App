// Tinggal tambah ke routes
const UserService = require('../services/userService');
class UserController {
    // // Get User
    // getAccount = async(req, res) => {
    //     const userId = req.userId;
    //     const user = await UserService.resolve(userId);
    //     res.json({ success: true, data: user });
    // }

    // Get User Detail
    getAccountDetail = async (req, res) => {
        try {
            const userId = req.user.id;
            const user = await UserService.getProfile(userId);
            res.json({ success: true, data: user });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    // Delete User
    delete = async(req, res) => {
        const userId = req.user.id;
        await UserService.delete(userId); // Cuman butuh ini karena udah cascade di database
        res.clearCookie("sessionId");
        res.redirect("/");
    }
}

module.exports = new UserController();