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

module.exports = {
    addPost,
};
