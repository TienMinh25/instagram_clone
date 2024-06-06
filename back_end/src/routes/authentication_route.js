const express = require("express");
const routerAuthen = express.Router();
const authorization = require("../middleware/authorization");

const { loginWithEmalAndPassword, logout, authenticate } = require("../controllers/authentication");

/**
 * @swagger
 * /api/v1/login:
 *  post:
 *    description: Login app
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
 *      security: []
 *    responses:
 *      201:
 *        description: Login succesful
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
 *                  example: Bạn đã đăng nhập thành công
 *      400:
 *        description: Not found email
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Không tìm thấy tài khoản
 *      401:
 *        description: Wrong password
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Sai thông tin đăng nhập, vui lòng thử lại!
 *      500:
 *        description: Internal server error
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *
 * components:
 *  securitySchemas:
 *    access_token:
 *      type: string
 *      in: cookie
 *      name: access_token
 */

routerAuthen.post("/login", loginWithEmalAndPassword);
routerAuthen.post("/logout", authorization, logout);
routerAuthen.post("/authentication", authorization, authenticate);

module.exports = routerAuthen;
