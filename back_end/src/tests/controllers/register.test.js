require("iconv-lite").encodingExists("foo");
const chai = require("chai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");
const { Op } = require("sequelize");
const { sequelize } = require("../../models/index.js");
const registerController = require("../../controllers/register_controller.js");
const { User } = sequelize.models;

jest.useFakeTimers();

describe("registerController", () => {
  let mockUser;
  let mockHashPassword;
  let mockToken;
  let req, res;
  let info;

  beforeEach(() => {
    mockUser = {
      firstName: "John",
      middleName: "Doe",
      lastName: "Smith",
      username: "johndoe",
      mobile: "1231241242",
      email: "johndoe@example.com",
      password: "check123",
    };
    mockHashPassword = "hashedPassword";
    mockToken = "jwtToken";

    const { password, ...info } = mockUser;

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
      const saveUser = {
        ...info,
        passwordHash: mockHashPassword,
        lastLogin: null,
        intro: null,
        profile: null,
        avatar: null,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };

      const responseUser = {
        ...info,
        lastLogin: null,
        intro: null,
        profile: null,
        avatar: null,
      };

      // Stub/mock dependencies (arrange)
      const findOneSpy = jest.spyOn(User, "findOne").mockResolvedValue(null); // User not found
      const hashSpy = jest.spyOn(bcrypt, "hash");
      const buildSpy = jest.fn(User.prototype, "build");
      const saveSpy = jest.fn(User.prototype, "save");
      const signSpy = jest.fn(jwt, "sign").mockResolvedValue(mockToken);

      hashSpy.mockImplementationOnce((password, salt, callback) =>
        callback(null, mockHashPassword)
      );
      // act
      await registerController(req, res);

      expect(findOneSpy).toHaveBeenCalledWith({
        where: {
          [Op.or]: [{ username: mockUser.username }, { email: mockUser.email }],
        },
      });

      expect(hashSpy).toHaveBeenCalled();
      expect(buildSpy).toHaveBeenCalled();
      expect(saveSpy).toHaveBeenCalled();

      // expect(signSpy).toHaveBeenCalledWith(
      //   { username: mockUser.username },
      //   "test@1234",
      //   {
      //     algorithm: "HS256",
      //     expiresIn: `${24 * 60 * 60 * 30 * 1000}`,
      //   }
      // );

      expect(res.status.calledWithExactly(201)).toBeTruthy();

      expect(
        res.cookie.calledWithExactly("authCookie", mockToken, {
          expires: new Date(new Date().getTime() + 24 * 60 * 60 * 30 * 1000),
        })
      ).toBeTruthy();

      expect(
        res.json.calledWithExactly({
          ...responseUser,
          message: "Bạn đã tạo tài khoản thành công",
        })
      ).toBeTruthy();
    });
  });

  describe("failure registration", () => {
    it("should duplicate username and return response which have status 409", async () => {
      const findedUser = {
        ...info,
        passwordHash: mockHashPassword,
        lastLogin: null,
        intro: null,
        profile: null,
        avatar: null,
      };

      // mock/spies/stub
      const findOneStub = sinon.stub(User, "findOne").resolves(findedUser);

      // act
      await registerController(req, res);

      // assert
      expect(
        findOneStub.calledOnceWithExactly({
          where: {
            [Op.or]: [
              { username: mockUser.username },
              { email: mockUser.email },
            ],
          },
        })
      ).toBeTruthy();
      expect(res.status.calledWithExactly(409)).toBeTruthy();
      expect(
        res.json.calledWithExactly({
          message: "Tài khoản đã tồn tại, vui lòng thử lại!",
        })
      ).toBeTruthy();
    });

    // test khi lưu vào db mà bị lỗi ==> khó lỗi vcl vì password có empty vẫn oke
    // it("should return internal server error on database error, status code 500", async () => {

    // });

    // test lỗi khi bcrypt xử lí promise failed ==> khi sinh hash password
    it("should return internal server error on unexpected error, status code 500", async () => {
      // mock/spies (arrange)
      const findOneStub = sinon.stub(User, "findOne").resolves(null);
      jest.spyOn(bcrypt, "hash").mockImplementation((data, salt, callback) => {
        callback(new Error("Bcrypt error"), null);
      });

      // act
      await registerController(req, res);

      // assert
      expect(
        findOneStub.calledWithExactly({
          where: {
            [Op.or]: [
              { username: mockUser.username },
              { email: mockUser.email },
            ],
          },
        })
      ).toBeTruthy();

      expect(res.status.calledWithExactly(500)).toBeTruthy();
      expect(
        res.json.calledWithExactly({
          message: "Không thể mã hoá mật khẩu",
        })
      ).toBeTruthy();
    });
  });
});
