const express = require("express");
const { addStory, getStoryPagination } = require("../controllers/story_controller");
const routerStory = express.Router();
const authorization = require("../middleware/authorization");

routerStory.post("/story", authorization, addStory);
routerStory.get("/story", authorization, getStoryPagination);

module.exports = routerStory;

