"use strict";
const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const likes = [];
        const numberOfLikes = 4000;
        const userIds = Array.from({ length: 30 }, (_, i) => i + 1);
        const postIds = Array.from({ length: 300 }, (_, i) => i + 1);

        for (let i = 0; i < numberOfLikes; i++) {
            const userId = userIds[Math.floor(Math.random() * userIds.length)];
            const postId = postIds[Math.floor(Math.random() * postIds.length)];
            const timestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

            likes.push({
                userId,
                postId,
                createdAt: timestamp,
                updatedAt: timestamp,
            });
        }

        await queryInterface.bulkInsert("likes", likes);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("likes", null, {});
    },
};
