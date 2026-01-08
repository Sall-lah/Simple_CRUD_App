const express = require('express');
const router = express.Router();
const googleAuthController = require('../controllers/googleAuthController');

// Route to Oauth Page
router.get("/google", googleAuthController.login);

// Route to Oauth Callback (aka what page loaded after the Oauth)
router.get("/google/callback", googleAuthController.callback);


module.exports = router;
