const express = require("express");
const userRoute = express.Router();
const authorization = require("../middleware/authorization");

module.exports = userRoute;
