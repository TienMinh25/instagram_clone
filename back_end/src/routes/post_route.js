const express = require('express');
const { createPost } = require('../controllers/post_controller');
const routerPost = express.Router()

routerPost.post('/users/:user_id/posts', createPost)
module.exports = routerPost;