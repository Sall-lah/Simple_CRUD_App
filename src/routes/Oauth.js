const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to Oauth Page
router.get("/google", authController.googleLogin);

// Route to Oauth Callback (aka what page loaded after the Oauth)
router.get("/google/callback", authController.googleCallback);

module.exports = router;
