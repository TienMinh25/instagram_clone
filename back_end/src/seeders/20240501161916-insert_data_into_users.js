"use strict";
const bcrypt = require("bcrypt");
const path = require("path");
const moment = require("moment");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        const hashedPassword = await bcrypt.hash("123456", parseInt(process.env.SALT_ROUNDS));
        await queryInterface.bulkInsert("users", [
            {
                username: "John Doe",
                email: "johndoe@gmail.com",
                name_tag: "johndoe",
                passwordHash: hashedPassword,
                avatar: path.join(__dirname, "../avatar", "avatar_default.jpeg"),
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Tim Han",
                email: "timhan@gmail.com",
                name_tag: "timhan",
                passwordHash: hashedPassword,
                avatar: path.join(__dirname, "../avatar", "avatar_default.jpeg"),
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Tom Kathein",
                email: "tomkathein@gmail.com",
                name_tag: "tomkathein",
                passwordHash: hashedPassword,
                avatar: path.join(__dirname, "../avatar", "avatar_default.jpeg"),
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Lady Girl",
                email: "ladygirl@gmail.com",
                name_tag: "ladygirl",
                passwordHash: hashedPassword,
                avatar: path.join(__dirname, "../avatar", "avatar_default.jpeg"),
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Mark Juckerbeign",
                email: "markjuckerbeign@gmail.com",
                name_tag: "markjuckerbeign",
                passwordHash: hashedPassword,
                avatar: path.join(__dirname, "../avatar", "avatar_default.jpeg"),
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete("users", null, {});
    },
};
