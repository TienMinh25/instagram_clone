const express = require("express");
const routerRegister = express.Router();

const registerController = require("../controllers/register_controller");

routerRegister.post("/register", registerController);

module.exports = routerRegister;
