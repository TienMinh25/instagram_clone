/**
 * Middleware use to authorization to access resource --> check JWT
 *
 * @param {Request} req
 * @param {Response} res
 * @param {import("express").NextFunction} next
 */

const jwt = require("jsonwebtoken");
module.exports = async (req, res, next) => {
    try {
        const tokenAuth = req.cookies.access_token;
        const payloadVerify = jwt.verify(tokenAuth, process.env.SECRET_KEY);

        if (payloadVerify != null) {
            next();
        }
    } catch (e) {
        return res.status(401).json({ message: "Unauthorized request!" });
    }
};
