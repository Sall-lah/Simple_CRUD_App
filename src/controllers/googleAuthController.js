const oauthClient = require('../configs/googleAuth');
const User = require('../models/userModel');

class googleAuthController {
    login = (req, res) => {
        const url = oauthClient.generateAuthUrl({
            access_type: "offline",
            scope: ["openid", "email", "profile"],
            prompt: "consent"
        })
        res.redirect(url)
    }

    callback = async (req, res) => {
        const code = req.query.code

        if (!code) {
            // return res.status(400).send("Missing authorization code")
            return res.redirect("/")
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

            // Check if user already exists
            const response = await User.getUserDetail(user.googleId);
            // Create new user on DB if user doesn't exist
            if (response.length === 0) {
                await User.createUser(user.googleId, user.email, user.name, user.picture);
            }

            // Create session
            res.cookie("sessionId", user.googleId, {
                httpOnly: true,
                secure: false, // true in production (HTTPS)
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 // 24 hours (Session Exparation)
            })
            console.log(req.cookies);

            res.redirect("/")
        } catch (err) {
            console.error(err)
            res.status(500).send("Authentication failed")
        }
    }
}

module.exports = new googleAuthController();