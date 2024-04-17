const moment = require("moment");
const { addPost } = require("../../controllers/post_controller.js");
const db = require("../../models/index.js");
const uploadFilesMiddleware = require("../../utils/images/upload_files.js");

jest.mock("../../utils/images/upload_files.js", () => jest.fn());
jest.mock("../../models/index.js", () => ({
    User_post: {
        create: jest.fn(),
    },
}));

describe("new post", () => {
    let req, res;
    beforeEach(() => {
        req = {
            params: { user_id: "1" },
            body: { description: "test" },
            files: [
                {
                    fieldname: "multiple-files",
                    originalname: "Screenshot 2024-04-13 at 13.25.22.png",
                    encoding: "7bit",
                    mimetype: "image/png",
                    destination: "/backend/src/uploads",
                    filename: "1713021815074-instagram-Screenshot 2024-04-13 at 13.25.22.png",
                    path: "/backend/src/uploads/1713021815074-instagram-Screenshot 2024-04-13 at 13.25.22.png",
                    size: 1272301,
                },
                {
                    fieldname: "multiple-files",
                    originalname: "Screenshot 2024-04-09 at 07.28.57.png",
                    encoding: "7bit",
                    mimetype: "image/png",
                    destination: "/backend/src/uploads",
                    filename: "1713021815110-instagram-Screenshot 2024-04-09 at 07.28.57.png",
                    path: "/backend/src/uploads/1713021815110-instagram-Screenshot 2024-04-09 at 07.28.57.png",
                    size: 5215059,
                },
            ],
        };

        res = {
            status: jest.fn(() => res),
            json: jest.fn(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should create succesfully", async () => {
        moment.utc = jest.fn().mockImplementation(() => "2024-04-17T03:49:16Z");
        const responsePost = {
            userId: 1,
            media: "/backend/src/uploads/1713021815074-instagram-Screenshot 2024-04-13 at 13.25.22.png$||$/backend/src/uploads/1713021815110-instagram-Screenshot 2024-04-09 at 07.28.57.png",
            createdAt: moment.utc(),
            updatedAt: moment.utc(),
            description: "test",
        };

        db.User_post.create.mockImplementation(() => responsePost);

        await addPost(req, res);

        expect(uploadFilesMiddleware).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.json).toHaveBeenCalledWith({ data: responsePost });
    });

    it("failure should have more than 10 files in request", async () => {
        uploadFilesMiddleware.mockImplementation(() => {
            let error = new Error("Too many files to upload.");
            error.code = "LIMIT_UNEXPECTED_FILE";
            throw error;
        });

        await addPost(req, res);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith({ message: "Too many files to upload." });
    });

    it("failure should not have user_id in params", async () => {
        uploadFilesMiddleware.mockImplementation(() => {});

        db.User_post.create.mockImplementation(() => {
            let error = new Error("Lỗi undefined, không có user_id trong req.params");
            throw error;
        });

        await addPost(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            message: "Lỗi undefined, không có user_id trong req.params",
        });
    });
});
