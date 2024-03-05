const express = require("express");
const routerLogin = express.Router();

const authentication = require("../middleware/authentication.js");

routerLogin.post("/login", authentication);

module.exports = routerLogin;
