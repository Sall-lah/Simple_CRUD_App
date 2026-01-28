const Session = require("../models/sessionModel");
const userService = require("../services/userService");

const requireAuth = async(req, res, next) =>{
  const sessionId = req.cookies.sessionId

  // No Session on Cookies
  if (!sessionId) {
    res.clearCookie("sessionId");
    return res.redirect("/api/login");
  }

  // Get userId by SessionId
  const users = await Session.getUserIdBySessionId(sessionId);
  
  // Get user detail from UserId
  const rows = await userService.resolve(users[0].user_id);

  // if not found
  if (!rows.length) {
    res.clearCookie("sessionId");
    return res.redirect("/");
  }

  // Attach user detail to req.user
  req.user = rows[0];
  next();
}

module.exports = requireAuth;