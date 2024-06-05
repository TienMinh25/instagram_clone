"use strict";
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
        await queryInterface.bulkInsert("user_posts", [
            {
                userId: 16,
                media: "/backend/public/post/postluongbui.jpg",
                description: "Vịu ơ 😘",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 1,
                media: "/backend/public/post/test1.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 2,
                media: "/backend/public/post/test2.jpeg$||$/backend/public/post/test3.jpeg",
                description: "Test 2, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 1,
                media: "/backend/public/post/test3.jpeg$||$/backend/public/post/test1.jpeg$||$/backend/public/post/test2.jpeg$||$/backend/public/post/test4.jpeg",
                description: "Test 3, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 3,
                media: "/backend/public/post/test2.jpeg$||$/backend/public/post/test3.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 8,
                media: "/backend/public/post/test2.jpeg$||$/backend/public/post/test3.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 5,
                media: "/backend/public/post/test2.jpeg$||$/backend/public/post/test3.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 7,
                media: "/backend/public/post/test4.jpeg$||$/backend/public/post/test1.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 12,
                media: "/backend/public/post/test2.jpeg$||$/backend/public/post/test3.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 14,
                media: "/backend/public/post/test4.jpeg$||$/backend/public/post/test3.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 4,
                media: "/backend/public/post/test3.jpeg$||$/backend/public/post/test1.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 10,
                media: "/backend/public/post/test1.jpeg$||$/backend/public/post/test3.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 12,
                media: "/backend/public/post/test3.jpeg$||$/backend/public/post/test4.jpeg",
                description: "Test 1, media default!",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            {
                userId: 11,
                media: "/backend/public/post/test4.jpeg$||$/backend/public/post/test2.jpeg",
                description: "Test 1, media default!",
                type: "post",
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
        await queryInterface.bulkDelete("user_posts", null, {});
    },
};
