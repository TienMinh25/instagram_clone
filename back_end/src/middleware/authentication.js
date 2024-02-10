const path = require("path");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { sequelize } = require(path.resolve(__dirname, "../models/index.js"));
const { User } = sequelize.models;

/**
 * Middleware authentication for web login
 *
 * @exports
 * @param {Request} req
 * @param {Response} res
 * @param {import("express").NextFunction} next
 */

const secretKey = "test@123";
module.exports = async (req, res, next) => {
  try {
    if (Object.keys(req.cookies).length === 0) {
      // nếu trong req.cookies có key thì chứng tỏ đã từng đăng nhập ===> chuyển luôn pass
      // middleware authorization

      next();
    } else {
      const { usernameCheck, passwordCheck } = req.body;
      const userCheck = await User.findOne({
        where: { username: usernameCheck },
      });
      if (userCheck === null) {
        res.status(400).json({ message: "Không tìm thấy tài khoản" });
      } else {
        const result = await bcrypt.compare(
          passwordCheck,
          userCheck.passwordHash
        );

        if (result) {
          // sinh jwt va tra ve cho user (expire 30 days)
          const token = jwt.sign(result.id, secretKey, {
            algorithm: "RS384",
            expiresIn: "30 days",
          });

          // tra ve cho browser status 200 + set cookie co key = 'login_jwt_string'
          res
            .status(200)
            .cookie("login_jwt_string", token, {
              expires: new Date(Date.now() + 24 * 60 * 60 * 30),
            })
            .json({ message: "Bạn đã đăng nhập thành công" });
        } else {
          res
            .status(401)
            .json({ message: "Sai thông tin đăng nhập, vui lòng thử lại!" });
        }
      }
    }
  } catch (error) {
    console.log(error.message);
  }
};
