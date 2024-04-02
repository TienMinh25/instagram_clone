const chai = require("chai");
const sinon = require("sinon");
const { createPost } = require("../../controllers/post_controller.js");
describe("new post", () => {
  let req, res;
  beforeEach(() => {
    req = { body: { media: "test" } };

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

  it("should create succesfully", async () => {
    chai.expect(req.body.media).to.not.equal(undefined);
    await createPost(req, res);
    expect(res.status.calledWithExactly(200)).toBeTruthy();
    expect(
      res.json.calledWithExactly({
        message: "OKE, you created new post successful!!✅",
      })
    ).toBeTruthy();
  });
});
