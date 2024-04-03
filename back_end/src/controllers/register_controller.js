const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
const db = require("../models/index.js");

const registerController = async (req, res) => {
    // khong can check password va confirmPassword ==> front end lo
    const { username, email, password, fullname } = req.body;
    try {
        const userCheck = await db.User.findOne({
            where: { [Op.or]: [{ username: username }, { email: email }] },
        });

        if (userCheck === null) {
            const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));

            let newUser = db.User.build({
                fullname: fullname,
                username: username,
                email: email,
                passwordHash: hashedPassword,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });

            await newUser.save();
            const user = await newUser.reload();
            const token = jwt.sign({ username: user.username }, process.env.SECRET_KEY, {
                algorithm: "HS256",
                expiresIn: `${24 * 60 * 60 * 30 * 1000}`,
            });

            const { passwordHash, createdAt, updatedAt, ...userReturned } = user.dataValues;

            // tra ve cho browser status 201 + set cookie co key = 'authCookie'
            return res
                .status(201)
                .cookie("authCookie", token, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 30 * 1000),
                })
                .json({
                    ...userReturned,
                    message: "Bạn đã tạo tài khoản thành công",
                });
        } else {
            return res.status(409).json({ message: "Tài khoản đã tồn tại, vui lòng thử lại!" });
        }
    } catch (error) {
        return res.status(500).json({ message: "Không thể xử lý yêu cầu" });
    }
};

module.exports = registerController;
