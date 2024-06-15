const moment = require("moment");
const db = require("../models/index.js");
const uploadFilesMiddleware = require("../utils/upload_files.js");
const { where, Op } = require("sequelize");

// Controller function to add a new post
const addPost = async (req, res) => {
    try {
        await uploadFilesMiddleware(req, res);
        let mutiplePath = "";
        const lengthOfFiles = req.files.length;

        for (let i = 0; i < lengthOfFiles; i++) {
            if (i != lengthOfFiles - 1) mutiplePath += req.files[i].path + "$||$";
            else mutiplePath += req.files[i].path;
        }
        const newPost = await db.User_post.create({
            userId: parseInt(req.query.user_id),
            media: mutiplePath === "" ? null : mutiplePath,
            type: req.body?.type || "post",
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            description: req.body.description === "" ? null : req.body.description,
        });

        return res.status(201).json({ data: newPost });
    } catch (error) {
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Too many files to upload." });
        }

        return res.status(500).json({ message: error.message });
    }
};

const getPostPagination = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const [data, itemCount] = await Promise.all([
        db.User_post.findAll({
            where: {
                type: "post",
            },
            offset: offset,
            limit: limit,
            include: [{ model: db.User, attributes: { exclude: ["passwordHash"] } }],
        }),
        db.User_post.count({
            where: {
                type: "post",
            },
        }),
    ]);

    const pageCount = Math.ceil(itemCount / limit);
    const hasPreviousPage = page > 1;
    const hasNextPage = page < pageCount;

    return res.status(200).json({
        data,
        meta: {
            page,
            limit,
            itemCount,
            pageCount,
            hasPreviousPage,
            hasNextPage,
        },
    });
};

const getPostOfUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const posts = await db.User_post.findAll({
            where: {
                userId: parseInt(userId),
            },
            attributes: {
                include: [
                    [
                        db.sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM likes
                        WHERE
                          likes.postId = User_post.id
                      )`),
                        "likeCount",
                    ],
                    [
                        db.sequelize.literal(`(
                        SELECT COUNT(*)
                        FROM comments AS comment
                        WHERE
                          comment.postId = User_post.id
                      )`),
                        "commentCount",
                    ],
                ],
            },
        });

        return res.status(200).json({ data: posts });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const getDetailPost = async (req, res) => {
    const postId = req.params.postId;

    try {
        const data = await db.User_post.findOne({
            where: {
                id: parseInt(postId),
            },
            include: [
                {
                    model: db.User,
                    attributes: {
                        exclude: "passwordHash",
                    },
                },
                {
                    model: db.Comment,
                    as: "comments",
                    attributes: [],
                },
                {
                    model: db.Like,
                    as: "likes",
                },
            ],
            attributes: {
                include: [
                    // Tính tổng số lượng comment
                    [db.sequelize.fn("COUNT", db.sequelize.col("comments.id")), "commentCount"],
                    // Tính tổng số lượng tym
                    [db.sequelize.fn("COUNT", db.sequelize.col("likes.id")), "likeCount"],
                ],
            },
            group: ["User_post.id", "User.id", "likes.id"],
        });

        return res.status(200).json({ data: data });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const deletePost = async (req, res) => {
    const postId = parseInt(req.params.postId);
    const userId = parseInt(req.query.userId);

    try {
        if (!postId) {
            return res.status(400).json({ message: "Required postId on the param" });
        }

        if (!userId) {
            return res.status(400).json({ message: "Required userId on the query" });
        }

        await Promise.all([
            db.Comment.destroy({
                where: {
                    postId: postId,
                },
            }),
            db.Like.destroy({
                where: {
                    postId: postId,
                },
            }),
        ]);

        const data = await db.User_post.destroy({
            where: {
                id: postId,
                userId: userId,
            },
        });

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    addPost,
    getPostPagination,
    getPostOfUser,
    getDetailPost,
    deletePost,
};
