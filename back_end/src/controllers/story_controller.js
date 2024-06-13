const moment = require("moment");
const db = require("../models/index.js");
const uploadStoryFilesMiddleware = require("../utils/upload_story.js");

const addStory = async (req, res) => {
    try {
        await uploadStoryFilesMiddleware(req, res);

        const newStory = await db.User_post.create({
            userId: parseInt(req.query.userId),
            media: req.file.path,
            type: req.body?.type || "story",
            createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            description: req.body.description ? null : req.body.description,
        });

        return res.status(201).json({ data: newStory });
    } catch (error) {
        if (error.code === "LIMIT_UNEXPECTED_FILE") {
            return res.status(400).json({ message: "Too many files to upload." });
        }

        return res.status(500).json({ message: error.message });
    }
};

const getStoryPagination = async (req, res) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const offset = (page - 1) * limit;

    const [data, itemCount] = await Promise.all([
        db.User_post.findAll({
            where: {
                type: "story",
            },
            offset: offset,
            limit: limit,
            include: [{ model: db.User, attributes: { exclude: ["passwordHash"] } }],
        }),
        db.User_post.count({
            where: {
                type: "story",
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

module.exports = {
    addStory,
    getStoryPagination,
};
