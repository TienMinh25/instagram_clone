const express = require("express");
const { createPost } = require("../controllers/post_controller");
const routerPost = express.Router();
const uploadMiddleware = require("../utils/images/upload_files");

routerPost.post("/users/:user_id/posts", uploadMiddleware, createPost);
module.exports = routerPost;
