const express = require("express");
const {
    addPost,
    getPostPagination,
    getPostOfUser,
    getDetailPost,
    deletePost,
} = require("../controllers/post_controller");
const routerPost = express.Router();
const authorization = require("../middleware/authorization");

routerPost.post("/posts", authorization, addPost);
routerPost.get("/posts", authorization, getPostPagination);
routerPost.get("/posts/users/:userId", authorization, getPostOfUser);
routerPost.get("/posts/:postId", authorization, getDetailPost);
routerPost.delete("/posts/:postId", authorization, deletePost);

module.exports = routerPost;
