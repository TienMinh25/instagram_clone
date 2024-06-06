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
                avatar: "/backend/public/avatar/avatar_test4.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Tim Han",
                email: "timhan@gmail.com",
                name_tag: "timhan",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test6.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Tom Kathein",
                email: "tomkathein@gmail.com",
                name_tag: "tomkathein",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test7.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Lady Girl",
                email: "ladygirl@gmail.com",
                name_tag: "ladygirl",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test8.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Mark Juckerbeign",
                email: "markjuckerbeign@gmail.com",
                name_tag: "markjuckerbeign",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test9.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Kanam",
                email: "kanam@gmail.com",
                name_tag: "kanam",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test10.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Mr Bean",
                email: "bean@gmail.com",
                name_tag: "Mr Bean",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test11.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "KongSo",
                email: "kongso@gmail.com",
                name_tag: "KongSo21",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test7.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Himari",
                email: "himari@gmail.com",
                name_tag: "Himari231",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test8.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Taylor",
                email: "taylor@gmail.com",
                name_tag: "Taylor Swift",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test7.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Nui",
                email: "nui@gmail.com",
                name_tag: "Núi",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test1.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "Hà",
                email: "hathipham@gmail.com",
                name_tag: "Ha123",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test10.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "hardword",
                email: "hardword@gmail.com",
                name_tag: "hardword",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test2.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "union",
                email: "union@gmail.com",
                name_tag: "union",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test7.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "kongsoohuyn",
                email: "kongsoohuyn@gmail.com",
                name_tag: "Kong Soo Huyn",
                passwordHash: hashedPassword,
                avatar: "/backend/public/avatar/avatar_test8.jpeg",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                username: "luongbui",
                email: "luongbui@gmail.com",
                name_tag: "Lương Bùi",
                passwordHash: hashedPassword,
                intro: "Muốn mời em đi ăn bữa tối, nhưng sợ trở thành bữa tối của em!",
                avatar: "/backend/public/avatar/luongbui.jpg",
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
