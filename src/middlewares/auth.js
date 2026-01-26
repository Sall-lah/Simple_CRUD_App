const Session = require("../models/sessionModel");

const requireAuth = async(req, res, next) =>{
  const sessionId = req.cookies.sessionId

  // No Session on Cookies
  if (!sessionId) {
    res.clearCookie("session_id");
    req.userId = null;
    return res.redirect("/login");
  }

  const rows = await Session.getUserIdBySessionId(sessionId);

  // if Session expired or Not found
  if (!rows.length) {
    res.clearCookie("session_id");
    return res.redirect("/login");
  }
  
  // Attach userId to req.userId
  req.userId = rows[0].user_id;
  next();
}
module.exports = requireAuth;