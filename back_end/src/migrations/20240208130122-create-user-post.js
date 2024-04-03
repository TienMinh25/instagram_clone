"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("user_posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20),
            },
            userId: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
            },
            message: {
                type: Sequelize.TEXT("tiny"),
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

        queryInterface.addIndex("user_posts", {
            fields: ["userId"],
            name: "idx_upost_user",
        });

        queryInterface.addConstraint("user_posts", {
            fields: ["userId"],
            name: "fk_upost_user",
            type: "foreign key",
            references: {
                table: "users",
                field: "id",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user_posts");
    },
};
