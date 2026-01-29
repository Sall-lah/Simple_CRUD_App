const SessionModel = require('../models/sessionModel');
const { randomUUID } = require("crypto");

class sessionService {
  create = async (userId) => {
    try {
      const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
      const createdAt = new Date(Date.now());
      const sessionId = randomUUID();
      await SessionModel.createSession(sessionId, userId, expiresAt, createdAt);

      return {
        status: "success",
        id: sessionId,
        expiresAt
      };
    }
    catch (e) {
      return {
        status: "failed",
        message: e
      };
    }
  }

  delete = async (sessionId) => {
    const response = await SessionModel.deleteSession(sessionId);
    return response;
  }
}
module.exports = new sessionService();