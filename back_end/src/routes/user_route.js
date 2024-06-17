const express = require("express");
const userRoute = express.Router();
const authorization = require("../middleware/authorization");
const { getUser, editUser, searchUser } = require("../controllers/user_controller");

userRoute.get("/users/:userId", authorization, getUser);
userRoute.put("/users/:userId", authorization, editUser);
userRoute.post("/users/search", authorization, searchUser);

module.exports = userRoute;
