// services/AuthService.js
const AuthIdentityModel = require("../models/authIdentityModel");
const SessionService = require("./sessionService");
const { randomUUID } = require("crypto");

class AuthService {
  login = async (providerId, provider) => {
    const authIdentity = await AuthIdentityModel.getUserIdByProviderId(providerId, provider);

    if (authIdentity.length > 0) {
      const session = await SessionService.create(authIdentity[0].user_id);
      return session;
    }

    return {
      status: "failed",
      message: "Authentication failed"
    };
  } 

  logout = async (sessionId) => {
    const response = await SessionService.delete(sessionId);
    return response;
  }

  createAuthIdentity = async (user_id, provider, provider_id) => {
    const AuthId = randomUUID();
    const authIdentity = await AuthIdentityModel.createAuthIdentity(AuthId, user_id, provider, provider_id);
    return authIdentity;
  }

  deleteAuthIdentity = async (user_id, provider) => {
    const authId = await AuthIdentityModel.getProviderIdByUserId(user_id, provider);
    const authIdentity = await AuthIdentityModel.deleteAuthIdentity(authId);
    return {
      status: "success",
      data: authIdentity,
    };
  }
}

module.exports = new AuthService();