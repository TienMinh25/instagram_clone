const moment = require("moment");
const db = require("../models/index.js");
const uploadFilesMiddleware = require("../utils/upload_files.js");

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
            type: req.body?.type || 'post',
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
    const page = parseInt(req.query.page) || 1;
    const take = parseInt(req.query.limit) || 4;
    const offset = (page - 1) * take;

    const [data, itemCount] = await Promise.all([
        db.User_post.findAll({
            offset: offset,
            limit: take,
            order: [["createdAt", "DESC"]],
            include: db.User,
        }),
        db.User_post.count(),
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
};

module.exports = {
    addPost,
    getPostPagination,
};
