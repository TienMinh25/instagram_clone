const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models/index.js");

const registerController = async (req, res) => {
  // khong can check password va confirmPassword ==> front end lo
  const { lastName, middleName, firstName, username, password, email, mobile } =
    req.body;

  try {
    const userCheck = await db.User.findOne({
      where: { [Op.or]: [{ username: username }, { email: email }] },
    });

    if (userCheck === null) {
      bcrypt.hash(
        password,
        parseInt(process.env.SALT_ROUNDS),
        async function (err, hashedPassword) {
          if (err) {
            return res
              .status(500)
              .json({ message: "Không thể mã hoá mật khẩu" });
          }
          let newUser = db.User.build({
            firstName: firstName,
            middleName: middleName,
            lastName: lastName,
            username: username,
            mobile: mobile,
            email: email,
            passwordHash: hashedPassword,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          });

          await newUser.save();
          const token = jwt.sign(
            { username: newUser.dataValues.username },
            process.env.SECRET_KEY,
            {
              algorithm: "HS256",
              expiresIn: `${24 * 60 * 60 * 30 * 1000}`,
            }
          );
          const { passwordHash, createdAt, updatedAt, ...userReturned } =
            newUser.dataValues;
          // tra ve cho browser status 200 + set cookie co key = 'login_jwt_string'
          return res
            .status(201)
            .cookie("authCookie", token, {
              expires: new Date(
                new Date().getTime() + 24 * 60 * 60 * 30 * 1000
              ),
            })
            .json({
              ...userReturned,
              message: "Bạn đã tạo tài khoản thành công",
            });
        }
      );
    } else {
      return res
        .status(409)
        .json({ message: "Tài khoản đã tồn tại, vui lòng thử lại!" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Không thể xử lý yêu cầu" });
  }
};

module.exports = registerController;
