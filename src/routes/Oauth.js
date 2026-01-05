const express = require('express');
const router = express.Router();
const OauthController = require('../controllers/OauthController');

// Route to Oauth Page
router.get("/google", OauthController.login);

// Route to Oauth Callback (aka what page loaded after the Oauth)
router.get("/google/callback", OauthController.callback);


module.exports = router;
