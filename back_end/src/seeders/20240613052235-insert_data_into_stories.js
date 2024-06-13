"use strict";
const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        const userIds = Array.from({ length: 30 }, (_, i) => i + 1);
        const stories = [];
        const storyMediaFiles = Array.from(
            { length: 100 },
            (_, i) => `/backend/public/story/story_${i + 1}.jpeg`,
        );
        for (let i = 0; i < 300; i++) {
            const userId = userIds[Math.floor(Math.random() * userIds.length)];
            const mediaCount = Math.floor(Math.random() * 5) + 1;
            const selectedMedia = Array.from(
                { length: mediaCount },
                () => storyMediaFiles[Math.floor(Math.random() * storyMediaFiles.length)],
            ).join("$||$");
            const timestamp = moment(Date.now()).format("YYYY-MM-DD HH:mm:ss");

            stories.push({
                userId: userId,
                media: selectedMedia,
                description: "",
                type: "story",
                createdAt: timestamp,
                updatedAt: timestamp,
            });
        }

        await queryInterface.bulkInsert("user_posts", stories);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete(
            "user_posts",
            {
                type: "story",
            },
            {},
        );
    },
};
