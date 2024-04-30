const express = require("express");
const oauth2Route = express.Router();
const {
    getUrlAuthorization,
    getGoogleCode,
    getUserDataAndTokenApp,
} = require("../controllers/oauth2_authentication");

oauth2Route.get("/oauth/url", getUrlAuthorization);
oauth2Route.get("/oauth/code", getGoogleCode);
oauth2Route.get("/oauth/token", getUserDataAndTokenApp);

module.exports = oauth2Route;
