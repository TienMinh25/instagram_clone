const express = require("express");
const commentRouter = express.Router();

const authorization = require("../middleware/authorization");
const {
    addComment,
    removeComment,
    editComment,
    getComment,
} = require("../controllers/comment_controller");

commentRouter.get("/comments", getComment); // query co postId = ?, page = ?, take = ?
commentRouter.post("/comments", addComment); // query co postId = ?, userId = ?
commentRouter.delete("/comments/:comment_id", removeComment); // query co userId = ?
commentRouter.put("/comments/:comment_id", editComment); // query co userId = ?

module.exports = commentRouter;
