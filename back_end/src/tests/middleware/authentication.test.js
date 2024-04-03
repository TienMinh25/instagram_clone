const path = require("path");
const sinon = require("sinon");
const chai = require("chai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const authentication = require("../../middleware/authentication.js");
const db = require("../../models/index.js");

describe("authentication middleware", () => {
    let req, res;
    let mockJWTtoken;
    let next;

    beforeEach(() => {
        mockJWTtoken = "jwtToken";
        process.env.SECRET_KEY = "test@1234";
        req = {
            body: {
                email: "johndoe",
                password: "check123",
            },
            cookies: { authCookie: mockJWTtoken },
        };

        res = {
            status: sinon.stub().returnsThis(),
            cookie: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
        };

        next = sinon.spy();
    });

    afterEach(() => {
        jest.clearAllMocks();
        sinon.restore();
    });

    it("check header cookie that should have a least one key and pass it to next middleware", async () => {
        // mock/spies function and data
        const keyStub = sinon.stub(Object, "keys").returns(["authCookie"]);

        await authentication(req, res, next);

        chai.expect(keyStub.calledWithExactly(req.cookies)).to.be.true;
        chai.expect(next.called).to.be.true;
        chai.expect(res.status.called).to.be.false;
        chai.expect(res.json.called).to.be.false;
        chai.expect(res.cookie.called).to.be.false;
    });

    it("should not find username in database and return status code 400", async () => {
        const keyStub = sinon.stub(Object, "keys").returns([]);
        jest.spyOn(db.User, "findOne").mockImplementation(() => {
            return null;
        });

        await authentication(req, res, next);

        chai.expect(keyStub.called).to.be.true;
        chai.expect(next.called).to.be.false;
        chai.expect(res.status.calledWith(400)).to.be.true;
        chai.expect(res.json.calledWith({ message: "Không tìm thấy tài khoản" })).to.be.true;
    });

    it("should find username in database but check for wrong password then return status code 401", async () => {
        const userFind = {
            fullname: "John Doe",
            username: "johndoe",
            mobile: "1231241242",
            email: "johndoe@example.com",
            passwordHash: "asdfsdfvasv",
            lastLogin: null,
            intro: null,
            profile: null,
            avatar: null,
        };

        sinon.stub(Object, "keys").returns([]);

        jest.spyOn(db.User, "findOne").mockImplementation(() => {
            return userFind;
        });
        jest.spyOn(bcrypt, "compare").mockResolvedValue(false);

        await authentication(req, res, next);

        chai.expect(next.called).to.be.false;
        chai.expect(res.status.calledWithExactly(401)).to.be.true;
        chai.expect(
            res.json.calledWithExactly({
                message: "Sai thông tin đăng nhập, vui lòng thử lại!",
            }),
        ).to.be.true;
    });

    it("should find username in database and check the correct password, then return status code 200 with JWT", async () => {
        const userFind = {
            dataValues: {
                fullname: "John Doe",
                username: "johndoe",
                mobile: "1231241242",
                email: "johndoe@example.com",
                passwordHash: "asdfsdfvasv",
                lastLogin: null,
                intro: null,
                profile: null,
                avatar: null,
            },
        };

        const { passwordHash, ...userResponse } = userFind.dataValues;

        jest.spyOn(Object, "keys").mockImplementation(() => {
            return [];
        });

        jest.spyOn(db.User, "findOne").mockImplementation(() => {
            return userFind;
        });
        jest.spyOn(bcrypt, "compare").mockResolvedValue(true);

        jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
            return mockJWTtoken;
        });

        Date.now = jest.fn().mockImplementation(() => 1708410531939);

        await authentication(req, res, next);

        chai.expect(next.called).to.be.false;

        chai.expect(res.status.calledWithExactly(200)).to.be.true;
        chai.expect(
            res.cookie.calledWithExactly("authCookie", mockJWTtoken, {
                expires: new Date(Date.now() + 24 * 60 * 60 * 30 * 1000),
            }),
        ).to.be.true;
        chai.expect(
            res.json.calledWithExactly({
                ...userResponse,
                message: "Bạn đã đăng nhập thành công",
            }),
        ).to.be.true;
    });

    it("should return internal server error on unexpected error, status code 500", async () => {
        jest.spyOn(Object, "keys").mockImplementation(() => {
            return [];
        });
        req.body = undefined;

        await authentication(req, res, next);

        chai.expect(res.status.calledWithExactly(500)).to.be.true;
        chai.expect(res.json.calledWithExactly({ message: "Không thể xử lí yêu cầu!" })).to.be.true;
    });
});
