const Session = require("../models/sessionModel");

const requireAuth = async(req, res, next) =>{
  const sessionId = req.cookies.sessionId

  // No Session on Cookies
  if (!sessionId) {
    return res.redirect("/login")
  }

  const rows = await Session.getUserIdBySessionId(sessionId);

  // if Session expired or Not found
  if (!rows.length) {
    res.clearCookie("session_id");
    await Session.deleteSession(sessionId);
    return res.redirect("/login");
  } else { // Update session expired date
    await Session.updateSession(sessionId);
  }
  
  // Attach userId to req.userId
  req.userId = rows[0].user_id;
  next()
}

module.exports = requireAuth;