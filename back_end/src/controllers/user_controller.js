const { where } = require("sequelize");
const db = require("../models/index.js");
const uploadAvatarFilesMiddleware = require("../utils/upload_avatar.js");

const getUser = async (req, res) => {
    const userId = parseInt(req.params.userId);

    try {
        // Lấy thông tin user
        const user = await db.User.findByPk(userId, {
            attributes: { exclude: ["passwordHash"] },
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Lấy số lượng follower
        const [followerCount, followingCount, postCount] = await Promise.all([
            db.User_follow.count({
                where: { targetId: userId },
            }),
            db.User_follow.count({
                where: { sourceId: userId },
            }),
            db.User_post.count({
                where: { userId },
            }),
        ]);

        return res.status(200).json({
            user,
            followerCount,
            followingCount,
            postCount,
        });
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const editUser = async (req, res) => {
    const userId = parseInt(req.params.userId);

    await uploadAvatarFilesMiddleware(req, res);
    try {
        if (req.file) {
            await db.User.update(
                {
                    username: req.body.username,
                    name_tag: req.body.name_tag,
                    intro: req.body.intro,
                    avatar: req.file.path,
                },
                {
                    where: {
                        id: userId,
                    },
                },
            );
        } else {
            await db.User.update(
                {
                    username: req.body.username,
                    name_tag: req.body.name_tag,
                    intro: req.body.intro,
                },
                {
                    where: {
                        id: userId,
                    },
                },
            );
        }

        return res.status(200).end();
    } catch (error) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

const getFollower = async (req, res) => {};

const getFollowing = async (req, res) => {};

module.exports = { getUser, editUser, getFollower, getFollowing };
