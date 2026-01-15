const oauthClient = require('../configs/googleAuth');
const AuthService = require('../services/authService');

class AuthController {
    // NOTE:
    
    // On work
    // passwordLogin = (req, res) => {

    // }

    googleLogin = (req, res) => {
        const url = oauthClient.generateAuthUrl({
            access_type: "offline",
            scope: ["openid", "email", "profile"],
            prompt: "consent"
        })
        res.redirect(url)
    }

    googleCallback = async (req, res) => {
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

            const session = await AuthService.login("google", user.googleId);
            
            if(session.status === "failed") {
                console.log("Authentication failed");
                return res.redirect("/");
            }
            
            // Create session
            res.cookie("sessionId", session.id, {
                httpOnly: true,
                secure: false, // true in production (HTTPS)
                sameSite: "lax",
                maxAge: session.expiresAt // 24 hours (Session Exparation)
            })
            // console.log(req.cookies);

            res.redirect("/")
        } catch (err) {
            console.error(err)
            res.status(500).send("Authentication failed")
        }
    }

    logout = async(req, res) => {
        
    }
}

module.exports = new AuthController();