require("iconv-lite").encodingExists("foo");
const moment = require("moment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
const { Op } = require("sequelize");
const db = require("../../models/index.js");
const registerController = require("../../controllers/register_controller.js");

jest.useFakeTimers();

describe("registerController", () => {
    let mockUser;
    let mockHashPassword;
    let mockToken;
    let req, res;

    beforeEach(() => {
        process.env.SECRET_KEY = "test@1234";

        mockUser = {
            username: "John Doe",
            name_tag: "johndoe",
            mobile: "1231241242",
            email: "johndoe@example.com",
            password: "check123",
        };
        mockHashPassword = "hashedPassword";
        mockToken = "jwtToken";

        req = { body: { ...mockUser } };

        res = {
            status: sinon.stub().returnsThis(),
            cookie: sinon.stub().returnsThis(),
            json: sinon.stub().returnsThis(),
        };
    });

    afterEach(() => {
        sinon.restore();
        jest.clearAllMocks();
    });

    describe("successful registration", () => {
        it("should create a new user with hashed password and return success response 201 with a JWT token", async () => {
            const { password, ...info } = mockUser;

            Date.now = jest.fn().mockImplementation(() => 1708504636281);

            const saveUser = {
                ...info,
                passwordHash: mockHashPassword,
                lastLogin: null,
                intro: null,
                profile: null,
                avatar: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            };

            const buildUser = {
                ...info,
                passwordHash: mockHashPassword,
                lastLogin: null,
                intro: null,
                profile: null,
                avatar: null,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                save: jest.fn().mockResolvedValue(saveUser),
                reload: jest.fn().mockResolvedValue(saveUser),
            };

            const userReload = {
                dataValues: {
                    ...info,
                    lastLogin: null,
                    intro: null,
                    profile: null,
                    avatar: null,
                },
            };

            const responseUser = {
                ...info,
                lastLogin: null,
                intro: null,
                profile: null,
                avatar: null,
            };

            // Stub/mock dependencies (arrange)
            const findOneSpy = jest.spyOn(db.User, "findOne").mockResolvedValue(null); // User not found
            const hashSpy = jest.spyOn(bcrypt, "hash").mockResolvedValue(mockHashPassword);
            jest.spyOn(db.User, "build").mockImplementation(() => buildUser);
            jest.spyOn(buildUser, "reload").mockImplementation(() => userReload);
            jest.spyOn(jwt, "sign").mockImplementation(() => mockToken);
            // act
            await registerController(req, res);

            expect(findOneSpy).toHaveBeenCalledWith({
                where: {
                    [Op.or]: [{ username: mockUser.username }, { email: mockUser.email }],
                },
            });

            expect(hashSpy).toHaveBeenCalled();

            expect(res.status.calledWithExactly(201)).toBeTruthy();

            expect(
                res.cookie.calledWithExactly("access_token", mockToken, {
                    expires: new Date(Date.now() + 24 * 60 * 60 * 30 * 1000),
                }),
            ).toBeTruthy();

            expect(
                res.json.calledWithExactly({
                    ...responseUser,
                    access_token: mockToken,
                }),
            ).toBeTruthy();
        });
    });

    describe("failure registration", () => {
        it("should duplicate username and return response which have status 409", async () => {
            const { password, ...info } = mockUser;

            const findedUser = {
                ...info,
                passwordHash: mockHashPassword,
                lastLogin: null,
                intro: null,
                profile: null,
                avatar: null,
            };

            // mock/spies/stub
            const findOneStub = sinon.stub(db.User, "findOne").resolves(findedUser);

            // act
            await registerController(req, res);

            // assert
            expect(
                findOneStub.calledOnceWithExactly({
                    where: {
                        [Op.or]: [{ username: mockUser.username }, { email: mockUser.email }],
                    },
                }),
            ).toBeTruthy();
            expect(res.status.calledWithExactly(409)).toBeTruthy();
            expect(
                res.json.calledWithExactly({
                    message: "Tài khoản đã tồn tại, vui lòng thử lại!",
                }),
            ).toBeTruthy();
        });

        // test khi lưu vào db mà bị lỗi ==> khó lỗi vcl vì password có empty vẫn oke
        // it("should return internal server error on database error, status code 500", async () => {

        // });

        // test lỗi khi bcrypt xử lí promise failed ==> khi sinh hash password
        it("should return internal server error on unexpected error, status code 500", async () => {
            // mock/spies (arrange)
            const findOneStub = sinon.stub(db.User, "findOne").resolves(null);
            jest.spyOn(bcrypt, "hash").mockImplementation((data, salt, callback) => {
                callback(new Error("Bcrypt error"), null);
            });

            // act
            await registerController(req, res);

            // assert
            expect(
                findOneStub.calledWithExactly({
                    where: {
                        [Op.or]: [{ username: mockUser.username }, { email: mockUser.email }],
                    },
                }),
            ).toBeTruthy();

            expect(res.status.calledWithExactly(500)).toBeTruthy();
            expect(
                res.json.calledWithExactly({
                    message: "Không thể xử lý yêu cầu",
                }),
            ).toBeTruthy();
        });
    });
});
