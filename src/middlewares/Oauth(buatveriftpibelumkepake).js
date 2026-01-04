// Middleware to check if user is authenticated
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  // Redirect to login page or send unauthorized response
  res.redirect('/auth/google');
}

// Middleware to check if user is NOT authenticated (for login page)
function ensureNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next();
  }
  // Redirect to home if already logged in
  res.redirect('/');
}

module.exports = {
  ensureAuthenticated,
  ensureNotAuthenticated
};
