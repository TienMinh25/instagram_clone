const express = require("express");
const routerRegister = express.Router();

const register = require("../controllers/register_controller");

routerRegister.post("/api/v1/register", register);

module.exports = routerRegister;
