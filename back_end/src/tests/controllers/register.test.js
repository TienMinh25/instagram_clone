const chai = require("chai");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sinon = require("sinon");

const { sequelize } = require("../../models/index.js");
const registerController = require("../../controllers/register_controller.js");
const { User } = sequelize.models;

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
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    mockHashPassword = "hashedPassword";
    mockToken = "jwtToken";

    const { save, reload, password, ...info } = mockUser;

    req = { body: { ...info, password: mockUser.password } };
    res = {
      status: sinon.stub().returnsThis(),
      cookie: sinon.stub().returnsThis(),
      json: sinon.stub().returnsThis(),
    };
  });

  afterEach(() => {
    sinon.restore();
  });

  describe("successful registration", () => {
    it("should create a new user with hashed password and return success response 201 with a JWT token", async () => {
      const buildUser = {
        ...info,
        passwordHash: mockHashPassword,
        lastLogin: null,
        intro: null,
        profile: null,
        avatar: null,
        save: async () => {},
      };

      const saveUser = {
        ...info,
        passwordHash: mockHashPassword,
        lastLogin: null,
        intro: null,
        profile: null,
        avatar: null,
      };

      const responseUser = {
        ...info,
        lastLogin: null,
        intro: null,
        profile: null,
        avatar: null,
      };

      // Stub/mock dependencies (arrange)
      const findOneStub = sinon.stub(User, "findOne").resolves(null); // User not found
      const genSaltStub = sinon
        .stub(bcrypt, "genSalt")
        .resolves("generatedSalt");
      const hashStub = sinon.stub(bcrypt, "hash").resolves(mockHashPassword);
      const buildStub = sinon.stub(User, "build").returns(buildUser);
      const saveStub = sinon.stub(buildUser, "save").resolves(saveUser);
      const signStub = sinon.stub(jwt, "sign").resolves(mockToken);

      // act
      await registerController(req, res);

      // assert
      chai.expect(
        findOneStub.calledWithExactly({
          where: { username: mockUser.username },
        })
      ).to.be.true;

      // them check khi assert tim thi ra null

      chai.expect(buildStub()).to.be.deep.equal(buildUser);

      genSaltStub().then((generatedSalt) => {
        chai.expect(generatedSalt).to.be.equal("generatedSalt");
      });

      hashStub().then((hashPassword) => {
        chai.expect(hashPassword).to.be.equal(mockHashPassword);
      });

      saveStub().then((result) => {
        chai.expect(result).to.be.deep.equal(saveUser);
      });

      signStub().then((token) => {
        chai.expect(token).to.be.equal(mockToken);
      });

      expect(res.status.calledWithExactly(201)).toBeTruthy;

      expect(
        res.cookie.calledWithExactly("login_jwt_string", mockToken, {
          expires: new Date(new Date().getTime() + 24 * 60 * 60 * 30 * 1000),
        })
      ).toBeTruthy;

      expect(
        res.json.calledWithExactly({
          ...responseUser,
          message: "Bạn đã tạo tài khoản thành công",
        })
      ).toBeTruthy;
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
          where: { username: mockUser.username },
        })
      );
      expect(res.status.calledWithExactly(409)).toBeTruthy;
      expect(
        res.json.calledWithExactly({
          message: "Tài khoản đã tồn tại, vui lòng thử lại!",
        })
      ).toBeTruthy;
    });

    // test khi lưu vào db mà bị lỗi ==> khó lỗi vcl vì password có empty vẫn oke
    // it("should return internal server error on database error, status code 500", async () => {

    // });

    // test lỗi khi bcrypt xử lí promise failed ==> khi sinh hash password
    it("should return internal server error on unexpected error, status code 500", async () => {
      // mock/spies (arrange)
      const findOneStub = sinon.stub(User, "findOne").resolves(null);
      const genSaltStub = sinon
        .stub(bcrypt, "genSalt")
        .yields(new Error("Error generating salt"));

      // act
      await registerController(req, res);

      // assert
      expect(
        findOneStub.calledWithExactly({
          where: { username: mockUser.username },
        })
      ).toBeTruthy;

      expect(genSaltStub.calledOnceWith(process.env.SALT_ROUNDS)).toBeTruthy;
      expect(res.status.calledWithExactly(500)).toBeTruthy;
      expect(res.json.calledWithExactly({ message: "Không thể xử lý yêu cầu" }))
        .toBeTruthy;
    });
  });
});
