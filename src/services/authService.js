// services/AuthService.js
const AuthIdentity = require("../models/authIdentityModel");
const SessionService = require("./sessionService");

class AuthService {
  login = async (providerId, provider) => {
    const authIdentity = await AuthIdentity.getUserIdByProviderId(providerId, provider);

    if (authIdentity.length > 0) {
      const session = await SessionService.create(authIdentity[0].user_id);
      return session;
    }

    return {
      status: "failed",
      message: "Authentication not found"
    };
  }

  create = async (id, user_id, provider, provider_id) => {
    const authIdentity = await AuthIdentity.createAuthIdentity(id, user_id, provider, provider_id);
    return authIdentity;
  }
}

module.exports = new AuthService();