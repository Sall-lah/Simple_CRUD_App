function requireAuth(req, res, next) {
  const sessionId = req.cookies.session

  if (!sessionId) {
    return res.redirect("/login")
  }

  // Check Session di DB
  // const session = sessions.get(sessionId)

  // if (!session || session.expiresAt < Date.now()) {
  //   res.clearCookie("session_id")
  //   return res.redirect("/login")
  // }

  // req.userId = session.userId
  next()
}

module.exports = requireAuth;