// Tinggal tambah ke routes
const UserService = require('../services/userService');
class UserController {
    // // Get User
    // getAccount = async(req, res) => {
    //     const userId = req.userId;
    //     const user = await UserService.resolve(userId);
    //     res.json({ success: true, data: user });
    // }

    // Delete User
    delete = async(req, res) => {
        const userId = req.userId;
        await UserService.delete(userId); // Cuman butuh ini karena udah cascade di database
        res.clearCookie("sessionId");
        res.redirect("/");
    }

    // Delete User (Test)
    deleteTest = async(req, res) => {
        const userId = "";
        await UserService.delete(userId); // Cuman butuh ini karena udah cascade di database
        res.clearCookie("sessionId");
        res.redirect("/");
    }
}

module.exports = new UserController();