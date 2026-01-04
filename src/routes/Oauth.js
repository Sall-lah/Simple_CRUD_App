const express = require('express');
const router = express.Router();
const oauthClient = require('../configs/Oauth');
// const passport = require('../configs/auth');
// const { ensureAuthenticated, ensureNotAuthenticated } = require('../middlewares/auth');

// Route to Oauth Page
router.get("/google", (req, res) => {
  const url = oauthClient.generateAuthUrl({
    access_type: "offline",
    scope: ["openid", "email", "profile"],
    prompt: "consent"
  })

  res.redirect(url)
})

// Route to Oauth Callback (aka what page loaded after the Oauth)
router.get("/google/callback", async (req, res) => {
  const code = req.query.code

  if (!code) {
    return res.status(400).send("Missing authorization code")
  }

  try {
    // Exchange code for tokens
    const { tokens } = await oauthClient.getToken(code)
    oauthClient.setCredentials(tokens)

    // Verify ID token
    const ticket = await oauthClient.verifyIdToken({
      idToken: tokens.id_token,
      audience: process.env.GOOGLE_CLIENT_ID
    })

    // Extract user information
    const payload = ticket.getPayload()
    const user = {
      googleId: payload.sub,
      email: payload.email,
      name: payload.name,
      picture: payload.picture
    }

    // TODO: Save or find user in DB
    // Create session
    // Coba req.cookies nanti
    res.cookie("session", user.googleId, {
      httpOnly: true,
      secure: false, // true in production (HTTPS)
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 // 24 hours (Session Exparation)
    })

    res.redirect("/")
  } catch (err) {
    console.error(err)
    res.status(500).send("Authentication failed")
  }
})


module.exports = router;
