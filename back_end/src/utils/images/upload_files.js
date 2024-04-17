const path = require("path");
const multer = require("multer");
const util = require("util");

var storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, path.join(`${__dirname}/../../uploads`));
    },
    filename: async (req, file, callback) => {
        const match = ["image/png", "image/jpeg"];

        if (match.indexOf(file.mimetype) === -1) {
            var message = `${file.originalname} is invalid. Only accept png/jpeg.`;
            return callback(message, null);
        }

        let filename = `${Date.now()}-instagram-${file.originalname}`;

        callback(null, filename);
    },
});

// Can dat ten cho field name trong the input trung voi uploadFiles o day
var uploadFiles = multer({
    storage: storage,
    limits: { fileSize: 40 * 1024 * 1024 },
}).array(`multiple-files`, 10);

// lam cho middleware nay dung dc async await
var uploadFilesMiddleware = util.promisify(uploadFiles);
module.exports = uploadFilesMiddleware;
