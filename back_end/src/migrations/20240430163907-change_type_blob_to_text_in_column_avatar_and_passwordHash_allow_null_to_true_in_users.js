"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.changeColumn("users", "avatar", {
            type: Sequelize.TEXT("medium"),
            allowNull: true,
            defaultValue: null,
        });

        await queryInterface.changeColumn("users", "passwordHash", {
            type: Sequelize.TEXT("medium"),
            allowNull: true,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.changeColumn("users", "avatar", {
            type: Sequelize.BLOB("medium"),
            defaultValue: null,
            allowNull: true,
        });

        await queryInterface.changeColumn("users", "passwordHash", {
            type: Sequelize.STRING(255),
            allowNull: false,
        });
    },
};
