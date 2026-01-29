const oauthClient = require('../configs/googleAuth');
const AuthService = require('../services/authService');
const UserService = require('../services/userService');

class AuthController {
    // NOTE:
    // Please Refactor
    // On work
    // + Pisahin antara Frontend sama Backend

    // passwordLogin = (req, res) => {

    // }

    // Google Login
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

            let session = await AuthService.login(user.googleId, "google");
            
            // if Authentication failed or new user
            if(session.status === "failed") {
                // Step 1 Create User
                const response = await UserService.create(user.name, user.email, user.picture);

                // Step 2 Create AuthIdentity
                await AuthService.createAuthIdentity(response.data.id, "google", user.googleId);

                // Step 3 Create Session
                session = await AuthService.login(user.googleId, "google");
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

    // Logout from account
    logout = async (req, res) => {
        try {
            const sessionId = req.cookies.sessionId;

            if (sessionId) {
                await AuthService.logout(sessionId);
                res.clearCookie("sessionId");
            }

            return res.status(204).end(); // No Content
        } catch (e) {
            console.error("Logout error:", e);
            return res.status(500).json({
                success: false,
                message: "Failed to logout"
            });
        }
    };

    // Unlink User
    // Unlink User Auth Provider
    deleteAuthIdentity = async (req, res) => {
        try {
            const userId = req.user.id; // asumsi dari auth middleware
            const { provider } = req.body;

            if (!provider) {
                return res.status(400).json({
                    success: false,
                    message: "Provider is required"
                });
            }

            await AuthService.deleteAuthIdentity(userId, provider);

            // Optional: logout user setelah unlink
            res.clearCookie("sessionId");

            return res.status(200).json({
                success: true,
                message: "Auth identity deleted"
            });
        } catch (e) {
            console.error("Delete auth identity error:", e);

            return res.status(500).json({
                success: false,
                message: "Failed to delete auth identity"
            });
        }
    };
}

module.exports = new AuthController();