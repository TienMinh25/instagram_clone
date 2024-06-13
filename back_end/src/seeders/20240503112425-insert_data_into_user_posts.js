"use strict";
const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const posts = [];
        const numberOfPosts = 300;
        const userIds = Array.from({ length: 30 }, (_, i) => i + 1);
        const mediaFiles = Array.from(
            { length: 150 },
            (_, i) => `/backend/public/post/test${i + 1}.jpeg`,
        );

        for (let i = 0; i < numberOfPosts; i++) {
            const userId = userIds[Math.floor(Math.random() * userIds.length)];
            const mediaCount = Math.floor(Math.random() * 5) + 1;
            const selectedMedia = Array.from(
                { length: mediaCount },
                () => mediaFiles[Math.floor(Math.random() * mediaFiles.length)],
            ).join("$||$");
            const description = `Test ${i + 1}`;
            const timestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

            posts.push({
                userId: userId,
                media: selectedMedia,
                description: description,
                type: "post",
                createdAt: timestamp,
                updatedAt: timestamp,
            });
        }

        await queryInterface.bulkInsert("user_posts", [
            {
                userId: 16,
                media: "/backend/public/post/postluongbui.jpg",
                description: "Vịu ơ 😘",
                type: "post",
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            ...posts,
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
        await queryInterface.bulkDelete(
            "user_posts",
            {
                type: "post",
            },
            {},
        );
    },
};
