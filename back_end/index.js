var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
var cookieParser = require("cookie-parser");
const helmet = require("helmet");
var morgan = require("morgan");
var dotenv = require("dotenv");

const app = express();
dotenv.config();
const routerRegister = require("./src/routes/register.js");
const authorization = require("./src/middleware/authorization.js");
const routerLogin = require("./src/routes/authentication_route.js");

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

// Setup for secure api
app.use(helmet({ crossOriginResourcePolicy: false }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(morgan("dev"));

// parse cookie header to data and assign it to req.cookies
app.use(cookieParser());

// register router
app.use("/api/v1", routerRegister);

// use middleware authentication
app.use("/api/v1", routerLogin);

// use middleware authorization
app.use("/api/v1", authorization);

// Catch 404 error (if user find some path not found on my app, it will generate status 404 for that)
app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

// handle for error path : ) but actually it should only handle for 404
app.use((err, req, res, next) => {
  const error = err;

  const status = error.status || 500;

  return res.status(status).json({
    error: {
      message: error.message,
    },
  });
});

app.listen(process.env.BACKEND_PORT, () => {
  console.log("CORS-enabled web server");
  console.log(`Backend is listening on port ${process.env.BACKEND_PORT}`);
});
