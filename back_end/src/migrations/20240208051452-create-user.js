"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("users", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT,
            },
            fullname: {
                type: Sequelize.STRING(50),
                defaultValue: null,
                allowNull: true,
            },
            username: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            mobile: {
                type: Sequelize.STRING(15),
                allowNull: true,
            },
            email: {
                type: Sequelize.STRING(50),
                allowNull: true,
            },
            passwordHash: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            lastLogin: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: null,
            },
            intro: {
                type: Sequelize.TEXT("tiny"),
                allowNull: true,
                defaultValue: null,
            },
            profile: {
                type: Sequelize.TEXT("medium"),
                allowNull: true,
                defaultValue: null,
            },
            avatar: {
                type: Sequelize.BLOB("medium"),
                defaultValue: null,
                allowNull: true,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
        await queryInterface.addIndex("users", ["username"], {
            name: "uq_username",
            unique: true,
        });

        await queryInterface.addIndex("users", ["mobile"], {
            name: "uq_mobile",
        });

        await queryInterface.addIndex("users", ["email"], {
            name: "uq_email",
            unique: true,
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("users");
    },
};
