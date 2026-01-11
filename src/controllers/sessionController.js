const Session = require("../models/sessionModel");

class SessionController {
    logoutSession = async(req, res) => {
        try{
            const { sessionId } = req.cookies;
            const response = await Session.deleteSession(sessionId);
            res.json({ success: true, data: response });
        } catch(error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new SessionController();