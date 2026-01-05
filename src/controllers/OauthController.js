const oauthClient = require('../configs/Oauth');

class OauthController {
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
            // hmmm
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

            // TODO: Save or find user in DB
            // Create session
            // Coba req.cookies nanti
            res.cookie("session", user.googleId, {
                httpOnly: true,
                secure: false, // true in production (HTTPS)
                sameSite: "lax",
                maxAge: 1000 * 60 * 60 * 24 // 24 hours (Session Exparation)
            })
            console.log(req.cookies.session);

            res.redirect("/")
        } catch (err) {
            console.error(err)
            res.status(500).send("Authentication failed")
        }
    }
}

module.exports = new OauthController();