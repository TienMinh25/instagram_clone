var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
var dotenv = require("dotenv");

const app = express();
dotenv.config();
const authentication = require("./src/middleware/authentication.js");
const routerRegister = require("./src/routes/register.js");
const authorization = require("./src/middleware/authorization.js");

const corOptions = {
  // use origin * for development purpose
  origin: true,
  // methods: ["GET", "POST", "HEAD", "PUT", "PATCH", "DELETE", "OPTIONS", "CONNECT", "TRACE"],
  methods: [
    "GET",
    "POST",
    "HEAD",
    "PUT",
    "PATCH",
    "DELETE",
    "OPTIONS",
    "CONNECT",
  ],
  preflightContinue: false,
  optionsSuccessStatus: 204,
  credentials: true,
};

/**
 * Config middleware for all path (API provided)
 - config cors ==> handle cross-origin resource sharing
 - config body-parser ==> Parse incoming request bodies ==> xu li cho nhieu kieu du lieu, thong thuong
    hay xu li cho du lieu tu form gui len hoac du lieu dang json, ngoai ra con co ho tro nhieu kieu du 
    lieu khac
 - 
 */

// config cors for all path of application  => default path: "/", doc co ghi : ))
app.use(cors(corOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse cookie header to data and assign it to req.cookies
app.use(cookieParser());

// register router
app.use("/api/v1", routerRegister);

// use middleware authentication
app.use("/api/v1", authentication);

// use middleware authorization
app.use("/api/v1", authorization);

app.listen(process.env.BACKEND_PORT, () => {
  console.log("CORS-enabled web server");
  console.log(`Backend is listening on port ${process.env.BACKEND_PORT}`);
});
