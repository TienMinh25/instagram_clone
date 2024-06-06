const express = require("express");
const userRoute = express.Router();
const authorization = require("../middleware/authorization");
const { getUser } = require("../controllers/user_controller");

userRoute.get('/users/:userId', authorization, getUser);

module.exports = userRoute;
