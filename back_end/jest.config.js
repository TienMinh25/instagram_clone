/** @type {import('jest').Config} */
const config = {
    verbose: true,
    rootDir: "./src/tests",
    testMatch: ["**/__tests__/**/*.[jt]s?(x)", "**/?(*.)+(spec|test).[jt]s?(x)"],
};

module.exports = config;
