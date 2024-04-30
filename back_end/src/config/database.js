const path = require("path");
require("dotenv").config({
    path: path.join(__dirname, "../../.env"),
});
module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        define: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        define: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        },
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: "mysql",
        port: process.env.DB_PORT,
        define: {
            charset: "utf8mb4",
            collate: "utf8mb4_unicode_ci",
        },
    },
};
