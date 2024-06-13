const { where } = require("sequelize");
const db = require("../models/index.js");
const sequelize = require("sequelize");
const moment = require("moment");

const addComment = async (req, res) => {
    const postId = req.query.postId;
    const userId = req.query.userId;
    const parentComment = req.body?.parentComment || null;
    let newComment;

    try {
        if (!postId || !userId) {
            return res.status(400).json({ message: "Required userId and postId on the query" });
        }

        if (parentComment && userId && postId) {
            const [comment, user, post] = await Promise.all([
                db.Comment.findOne({
                    where: {
                        id: parseInt(parentComment),
                    },
                }),
                db.User.findOne({
                    where: {
                        id: parseInt(userId),
                    },
                }),
                db.User_post.findOne({
                    where: {
                        id: postId,
                    },
                }),
            ]);

            if (!comment || !user || !post) {
                return res.status(400).json({ message: "Data is not valid, please try again" });
            }

            newComment = await db.Comment.create({
                userId: parseInt(userId),
                postId: parseInt(postId),
                content: req.body.content,
                parentComment: parseInt(parentComment),
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
        } else if (userId && postId) {
            const [user, post] = await Promise.all([
                db.User.findOne({
                    where: {
                        id: parseInt(userId),
                    },
                }),
                db.User_post.findOne({
                    where: {
                        id: postId,
                    },
                }),
            ]);

            if (!user || !post) {
                return res.status(400).json({ message: "Data is not valid, please try again" });
            }

            newComment = await db.Comment.create({
                userId: parseInt(userId),
                postId: parseInt(postId),
                content: req.body.content,
                parentComment: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            });
        }
        return res.status(201).json(newComment);
    } catch (e) {
        return res.status(500).json({ message: "Cannot create new comment" });
    }
};

const removeComment = async (req, res) => {
    const postId = req.query.postId;
    const userId = req.query.userId;
    const commentId = req.params.comment_id;

    try {
        if (!postId || !userId) {
            return res.status(400).json({ message: "Required userId and postId on the query" });
        }

        const data = await db.Comment.destroy({
            where: {
                id: parseInt(commentId),
                userId: parseInt(userId),
                postId: parseInt(postId),
            },
        });

        return res.status(200).json(data);
    } catch (e) {
        return res.status(500).json({ message: "Cannot delete comment" });
    }
};

const editComment = async (req, res) => {
    const postId = req.query.postId;
    const userId = req.query.postId;
    const commentId = req.params.comment_id;
    const data = req.body;

    if (!postId || !userId || !commentId) {
        return res
            .status(400)
            .json({ message: "Required postId and userId on the query, commentId in path" });
    }

    const t = await sequelize.transaction();
    try {
        await db.Comment.update(
            {
                content: req.body.content,
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                where: { id: commentId, postId: postId, userId: userId },
                transaction: t,
            },
        );

        const data = await db.Comment.findOne(
            {
                where: {
                    commentId: parseInt(commentId),
                },
            },
            { transaction: t },
        );

        await t.commit();
        return res.status(200).json(data);
    } catch (e) {
        await t.rollback();
        return res.status(500).json({ message: "Cannot edit comment" });
    }
};

const getComment = async (req, res) => {
    const postId = req.query.postId;
    const page = parseInt(req.query?.page) || 1;
    const take = parseInt(req.query?.take) || 8;
    const commentParent = req.query?.commentParent ? parseInt(req.query?.commentParent) : null;
    const offset = (page - 1) * take;

    if (!postId) {
        return res.status(400).json({ message: "Required postId on the query" });
    }

    try {
        const [data, itemCount] = await Promise.all([
            db.Comment.findAll({
                where: {
                    postId: parseInt(postId),
                    parentComment: commentParent,
                },
                offset: offset,
                limit: take,
                include: [
                    {
                        model: db.User,
                        as: "User",
                        attributes: {
                            exclude: "passwordHash",
                        },
                    },
                ],
                attributes: {
                    include: [
                        [
                            db.sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM comments AS childrenComments
                            WHERE childrenComments.parentComment = Comment.id
                        )`),
                            "childrenCommentCount",
                        ],
                    ],
                },
            }),
            db.Comment.count({
                where: {
                    postId: postId,
                },
            }),
        ]);

        const pageCount = Math.ceil(itemCount / take);
        const hasPreviousPage = page > 1;
        const hasNextPage = page < pageCount;

        return res.status(200).json({
            data,
            meta: {
                page,
                take,
                itemCount,
                pageCount,
                hasPreviousPage,
                hasNextPage,
            },
        });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    addComment,
    removeComment,
    editComment,
    getComment,
};
