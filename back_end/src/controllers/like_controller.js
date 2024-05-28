const db = require("../models/index.js");

const getLike = async (req, res) => {
    try {
        const postId = req.query.postId;

        // Kiểm tra nếu postId không tồn tại hoặc không hợp lệ
        if (!postId) {
            return res.status(400).json({ message: "postId is required" });
        }
        const { count, rows } = await db.Like.findAndCountAll({
            where: {
                postId: postId,
            },
        });

        return res.status(200).json({ likes: count, data: rows });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const addLike = async (req, res) => {
    try {
        const postId = req.query.postId;
        const userId = req.query.userId;

        if (!postId || !userId) {
            return res.status(400).json({ message: "postId and userId is required" });
        }

        const newLike = await db.Like.create({
            userId,
            postId,
        });

        return res.status(200).json({ data: newLike.dataValues });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

const deleteLike = async (req, res) => {
    try {
        const postId = req.query.postId;
        const userId = req.query.userId;

        if (!postId || !userId) {
            return res.status(400).json({ message: "postId and userId is required" });
        }

        const deletedCount = await db.Like.destroy({
            where: {
                postId: postId,
                userId: userId,
            },
        });

        if (deletedCount === 0) {
            return res.status(404).json({ message: "Like not found" });
        }

        return res.status(200).json({ deletedCount });
    } catch (e) {
        return res.status(500).json({ message: e.message });
    }
};

module.exports = {
    getLike,
    addLike,
    deleteLike,
};
