"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     
     */
        await queryInterface.removeColumn("user_posts", "message");
        await queryInterface.addColumn("user_posts", "media", {
            type: DataTypes.BLOB,
            allowNull: false,
        });
        await queryInterface.addColumn("user_posts", "description", {
            type: DataTypes.TEXT,
        });
        await queryInterface.addColumn("user_posts", "hashtags", {
            type: DataTypes.TEXT,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.addColumn("user_posts", "message", {
            type: DataTypes.TEXT,
        });

        await queryInterface.removeColumn("user_posts", "media");
        await queryInterface.removeColumn("user_posts", "description");
        await queryInterface.removeColumn("user_posts", "hashtags");
    },
};
