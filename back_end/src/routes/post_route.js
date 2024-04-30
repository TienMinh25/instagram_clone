const express = require("express");
const { addPost } = require("../controllers/post_controller");
const routerPost = express.Router();

/**
 * @swagger
 * paths:
 *  /api/v1/users/{user_id}/posts:
 *    post:
 *      description: User can create a new post
 *      tags:
 *        - users
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                mutiple-files:
 *                  type: array
 *                  items:
 *                    type: string
 *                    format: binary
 *                description:
 *                  type: string
 *      parameters:
 *        - in: path
 *          name: user_id
 *          required: true
 *          descrition: user id of the user who created new post
 *          schema:
 *            type: integer
 *            example: 3
 *      responses:
 *        201:
 *          description: Create a new post successful
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 *        400:
 *          description: Upload many files (> 10)
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Too many files to upload.
 *        500:
 *          description: Internal server error
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                    type: string
 *                    example: Cannot convert user_id from string to integer
 * components:
 *  schemas:
 *    Post:
 *      type: object
 *      properties:
 *        id:
 *          type: integer
 *          example: 2
 *        userId:
 *          type: integer
 *          example: 3
 *        media:
 *          type: string
 *          example: /backend/src/uploads/1713021815074-instagram-Screenshot 2024-04-13 at 13.25.22.png$||$/backend/src/uploads/1713021815110-instagram-Screenshot 2024-04-09 at 07.28.57.png
 *        description:
 *          type: string
 *          example: Wow, feel so good
 *        createdAt:
 *          type: string
 *          example: '2024-02-14'
 *        updatedAt:
 *          type: string
 *          example: '2024-02-14'
 *
 * tags:
 *  - name: users
 *    description: Everything about users can do
 */
routerPost.post("/users/:user_id/posts", addPost);

module.exports = routerPost;
