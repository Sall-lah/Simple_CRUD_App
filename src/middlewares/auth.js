const Session = require("../models/sessionModel");
const { randomUUID } = require("crypto");

const requireAuth = async(req, res, next) =>{
  const sessionId = req.cookies.session

  // No Session on Cookies
  if (!sessionId) {
    return res.redirect("/login")
  }

  const rows = await Session.getUserIdBySessionId(sessionId);

  // Session expired
  if (!rows.length) {
    res.clearCookie("session_id");
    await Session.deleteSession(sessionId);
    return res.redirect("/login");
  } else { // Update session expired date
    await Session.updateSession(sessionId);
  }
  
  // Attch userId to req.userId
  req.userId = rows[0].user_id;
  next()
}

module.exports = requireAuth;