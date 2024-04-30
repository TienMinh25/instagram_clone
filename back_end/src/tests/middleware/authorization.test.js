const jwt = require("jsonwebtoken");
const authorization = require("../../middleware/authorization");

jest.mock("jsonwebtoken", () => ({
    verify: jest.fn(),
}));

describe("authorization middleware", () => {
    let req, res, next;

    beforeEach(() => {
        process.env.SECRET_KEY = "test@1234";
        req = {
            cookies: {
                access_token: "tokenJWT",
            },
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockReturnThis(),
        };

        next = jest.fn().mockReturnThis();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
    it("should call next() if token is verified", async () => {
        jwt.verify.mockReturnValue({ username: "johndoe" });

        await authorization(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith("tokenJWT", process.env.SECRET_KEY);
        expect(next).toHaveBeenCalled();
        expect(res.status).not.toHaveBeenCalled();
        expect(res.json).not.toHaveBeenCalled();
    });

    it("should return 401 if token verification fails", async () => {
        jwt.verify.mockImplementation(() => {
            throw new Error("Token is unvalid");
        });

        await authorization(req, res, next);

        expect(jwt.verify).toHaveBeenCalledWith("tokenJWT", process.env.SECRET_KEY);
        expect(next).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401);
        expect(res.json).toHaveBeenCalledWith({ message: "Unauthorized request!" });
    });
});
