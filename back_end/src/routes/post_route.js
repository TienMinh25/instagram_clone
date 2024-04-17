const express = require("express");
const { addPost } = require("../controllers/post_controller");
const routerPost = express.Router();

routerPost.post("/users/:user_id/posts", addPost);
module.exports = routerPost;
