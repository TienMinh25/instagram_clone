const express = require("express");
const routerRegister = express.Router();

const registerController = require("../controllers/register_controller");

/**
 * @swagger
 * /api/v1/register:
 *  post:
 *    description: Register user
 *    tags:
 *      - users
 *    requestBody:
 *      required: true
 *      content:
 *        application/x-www-form-urlencoded:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                example: test1@gmail.com
 *              password:
 *                type: string
 *                example: 124123
 *              username:
 *                type: string
 *                example: john doe
 *      security: []
 *    responses:
 *      201:
 *        description: Register succesful
 *        headers:
 *          Set-Cookie:
 *            description: access token for user
 *            schema:
 *              $ref: '#/components/securitySchemas/access_token'
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                id:
 *                  type: integer
 *                  example: 1
 *                username:
 *                  type: string
 *                  example: John Doe
 *                mobile:
 *                  type: string
 *                  example: 0789738212
 *                email:
 *                  type: string
 *                  example: johndoe@gmail.com
 *                intro:
 *                  type: string
 *                avatar:
 *                  type: string
 *                  format: binary
 *                lastLogin:
 *                  type: string
 *                  format: date
 *                message:
 *                  type: string
 *                  example: Bạn đã tạo tài khoản thành công
 *      409:
 *        description: Exists user
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              message:
 *                type: string
 *                example: Tài khoản đã tồn tại, vui lòng thử lại!
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 */

routerRegister.post("/register", registerController);

module.exports = routerRegister;
