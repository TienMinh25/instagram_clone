const express = require("express");
const userRoute = express.Router();
const authorization = require("../middleware/authorization");

const { getAvatar } = require("../controllers/user_controller");

userRoute.get("/users/avatar", getAvatar);

module.exports = userRoute;