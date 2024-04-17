"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.removeColumn("users", "fullname");
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.addColumn("users", "fullname", {
            type: Sequelize.STRING(50),
            defaultValue: null,
            allowNull: true,
        });
    },
};
