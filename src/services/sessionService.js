const SessionModel = require('../models/sessionModel');
const UserServices = require('../services/userService');
const { randomUUID } = require("crypto");

class sessionService {
  create = async (userId) => {
    const user = await UserServices.resolve(userId);

    if(user.length === 0){
      return { 
        status: "failed",
        message: "User not found"
      };
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const createdAt = new Date(Date.now());
    const sessionId = randomUUID();
    await SessionModel.createSession(sessionId, user[0].id, expiresAt, createdAt);

    return {
      status: "success",
      id: sessionId,
      expiresAt
    };
  }

  delete = async (sessionId) => {
    const response = await SessionModel.deleteSession(sessionId);
    return response;
  }
}
module.exports = new sessionService();