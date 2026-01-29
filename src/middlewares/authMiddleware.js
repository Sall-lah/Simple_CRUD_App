const Session = require("../models/sessionModel");
const userService = require("../services/userService");

const requireAuth = async (req, res, next) => {
  const logoutAndRedirect = () => {
    res.clearCookie("sessionId");
    return res.redirect("/login");
  };

  try {
    const { sessionId } = req.cookies;

    // 1. Missing session cookie
    if (!sessionId) {
      return logoutAndRedirect();
    }

    // 2. Invalid / expired session
    const sessions = await Session.getUserIdBySessionId(sessionId);
    if (!sessions?.length) {
      return logoutAndRedirect();
    }

    const userId = sessions[0].user_id;

    // 3. User not found / deleted
    const users = await userService.resolve(userId);
    if (!users?.length) {
      return logoutAndRedirect();
    }

    // 4. Attach authenticated user
    req.user = users[0];
    return next();

  } catch (error) {
    console.error("Auth middleware error:", error);
    return logoutAndRedirect();
  }
};

module.exports = requireAuth;