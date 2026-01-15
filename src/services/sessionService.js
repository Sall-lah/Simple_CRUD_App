const Session = require('../models/sessionModel');
const User = require('../models/userModel');
const { randomUUID } = require("crypto");

class sessionService {
  create = async (userId) => {
    const user = await User.resolve(userId);

    if(user.length === 0){
      return { 
        status: "failed",
        message: "User not found"
      };
    }

    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    const createdAt = new Date(Date.now());
    const sessionId = randomUUID();
    const session = await Session.create(sessionId, user[0].id, expiresAt, createdAt);

    return {
      status: "success",
      id: session,
      expiresAt
    };
  }
}
module.exports = new sessionService();