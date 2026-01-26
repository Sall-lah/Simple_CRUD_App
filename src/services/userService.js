const UserModel = require('../models/userModel');
const { randomUUID } = require("crypto");

class userService {
    resolve = async (userId) => {
        try {
            const response = await UserModel.resolve(userId);
            return response;
        }
        catch (e) {
            return {
                status: "failed",
                message: e
            };
        }
    }

    create = async (name, email, image_link = "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250") => {
        try {
            const userId = randomUUID();
            await UserModel.resolve(userId, name, email, image_link);

            return {
                status: "success",
                message: "User created successfully",
            };
        }
        catch (e) {
            return {
                status: "failed",
                message: e
            };
        }
    }

    delete = async (userId) => {
        try {
            await UserModel.deleteUser(userId);
            return {
                status: "success",
                message: "User deleted successfully",
            };
        }
        catch (e) {
            return {
                status: "failed",
                message: e
            };
        }
    }
}
module.exports = new userService();