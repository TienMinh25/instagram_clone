const express = require("express");
const likeRouter = express.Router();
const authorization = require("../middleware/authorization");

const { getLike, addLike, deleteLike } = require("../controllers/like_controller");

likeRouter.get("/likes", authorization, getLike); // postId = ? on query
likeRouter.post("/likes", authorization, addLike); // userId = ?, postId = ? on query
likeRouter.delete("/likes", authorization, deleteLike); // userId = ?, postId = ? on query

module.exports = likeRouter;
