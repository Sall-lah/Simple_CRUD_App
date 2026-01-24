// services/AuthService.js
const AuthIdentityModel = require("../models/authIdentityModel");
const UserModel = require("../models/userModel");
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
      message: "Authentication not found"
    };
  }

  createAuthIdentity = async (user_id, provider, provider_id) => {
    const AuthId = randomUUID();
    const authIdentity = await AuthIdentityModel.createAuthIdentity(AuthId, user_id, provider, provider_id);
    return authIdentity;
  }

  createUser = async (username, email, picture) => {
    const userId = randomUUID();
    const user = await UserModel.createUser(userId, username, email, picture);
    return user;
  }
}

module.exports = new AuthService();