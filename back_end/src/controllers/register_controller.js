const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sequelize } = require("../models/index.js");
const { User } = sequelize.models;

const registerController = async (req, res) => {
  // khong can check password va confirmPassword ==> front end lo
  const { lastName, middleName, firstName, username, password, email, mobile } =
    req.body;

  try {
    const userCheck = await User.findOne({
      where: { username: username },
    });

    if (userCheck === null) {
      bcrypt.genSalt(process.env.SALT_ROUNDS, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          let newUser = User.build({
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

          newUser
            .save()
            .then(async (userSave) => {
              // sinh jwt va tra ve cho user (expire 30 days)
              const token = jwt.sign(
                { username: userSave.username },
                process.env.SECRET_KEY,
                {
                  algorithm: "HS256",
                  expiresIn: `${24 * 60 * 60 * 30 * 1000}`,
                }
              );

              const { passwordHash, ...userReturned } = userSave;
              // tra ve cho browser status 200 + set cookie co key = 'login_jwt_string'
              return res
                .status(201)
                .cookie("login_jwt_string", token, {
                  expires: new Date(
                    new Date().getTime() + 24 * 60 * 60 * 30 * 1000
                  ),
                })
                .json({
                  ...userReturned,
                  message: "Bạn đã tạo tài khoản thành công",
                });
            })
            .catch((err) => {
              return res
                .status(500)
                .json({ message: "Không thể xử lý yêu cầu" });
            });
        });
      });
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
