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
        await queryInterface.changeColumn("users", "username", {
            type: Sequelize.STRING(100),
            allowNull: false,
        });

        await queryInterface.addColumn("users", "name_tag", {
            type: Sequelize.STRING(100),
            allowNull: false,
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.changeColumn("users", "username", {
            type: Sequelize.STRING(50),
            allowNull: false,
        });

        await queryInterface.removeColumn("users", "name_tag");
    },
};
