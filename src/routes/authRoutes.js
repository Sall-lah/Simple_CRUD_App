const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const requireAuth = require('../middlewares/authMiddleware');
const userController = require('../controllers/userController');

// Route to Oauth Page
router.get("/google", authController.googleLogin);

// Route to Oauth Callback (aka what page loaded after the Oauth)
router.get("/google/callback", authController.googleCallback);

router.delete("/logout", requireAuth, authController.logout);

router.delete("/identity", requireAuth, authController.deleteAuthIdentity);

router.delete("/account", requireAuth, userController.delete);

module.exports = router;
