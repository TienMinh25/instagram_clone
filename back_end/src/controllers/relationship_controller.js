const { where, Op } = require("sequelize");
const db = require("../models/index.js");
const moment = require("moment");

const getRelationships = async (req, res) => {
    const userId = req.query.userId;

    try {
        const usersFollowed = await db.User_follow.findAll({
            where: {
                sourceId: parseInt(userId),
            },
            order: [["createdAt", "DESC"]],
        });

        const usersFollowedId = usersFollowed.map((userFolowed) => userFolowed.targetId);

        const usersNotFollowed = await db.User.findAll({
            where: {
                id: {
                    [Op.notIn]: usersFollowedId,
                },
            },
            attributes: {
                exclude: ["passwordHash"],
            },
            limit: 5,
        });

        return res.status(200).json({ data: usersNotFollowed });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const addRelationships = async (req, res) => {
    const userId = req.body.userId;
    const targetId = req.body.targetId;
    try {
        await db.User_follow.create({
            sourceId: parseInt(userId),
            targetId: parseInt(targetId),
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        });

        return res.status(200).end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

const deleteRelationships = async (req, res) => {
    const userId = req.query.userId;
    const targetId = req.query.targetId;
    try {
        await db.User_follow.destroy({
            where: {
                sourceId: parseInt(userId),
                targetId: parseInt(targetId),
            },
        });

        return res.status(200).end();
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

module.exports = { addRelationships, deleteRelationships, getRelationships };
