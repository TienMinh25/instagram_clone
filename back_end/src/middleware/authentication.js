const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const db = require(path.resolve(__dirname, "../models/index.js"));

/**
 * Middleware authentication for web login
 *
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {import("express").NextFunction} next
 */

module.exports = async (req, res, next) => {
    try {
        if (Object.keys(req.cookies).length !== 0) {
            // nếu trong req.cookies có key thì chứng tỏ đã từng đăng nhập ===> chuyển luôn pass
            // middleware authorization
            next();
        } else {
            const { email, password } = req.body;
            const userCheck = await db.User.findOne({
                where: { email: email },
            });

            if (userCheck === null) {
                return res.status(400).json({ message: "Không tìm thấy tài khoản" });
            } else {
                const result = await bcrypt.compare(password, userCheck.passwordHash);

                if (result) {
                    // sinh jwt va tra ve cho user (expire 30 days)
                    const token = jwt.sign({ username: result.username }, process.env.SECRET_KEY, {
                        algorithm: "HS256",
                        expiresIn: `${24 * 60 * 60 * 30 * 1000}`,
                    });

                    const { passwordHash, createdAt, updatedAt, ...userReturned } =
                        userCheck.dataValues;
                    // tra ve cho browser status 200 + set cookie co key = 'authCookie'
                    res.status(200)
                        .cookie("authCookie", token, {
                            expires: new Date(Date.now() + 24 * 60 * 60 * 30 * 1000),
                        })
                        .json({ ...userReturned, message: "Bạn đã đăng nhập thành công" });
                } else {
                    res.status(401).json({ message: "Sai thông tin đăng nhập, vui lòng thử lại!" });
                }
            }
        }
    } catch (error) {
        res.status(500).json({ message: "Không thể xử lí yêu cầu!" });
    }
};
