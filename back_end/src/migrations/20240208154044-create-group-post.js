"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("group_posts", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20),
            },
            groupId: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
            },
            userId: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT("tiny"),
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

        await queryInterface.addIndex("group_posts", {
            name: "idx_gpost_group",
            fields: [
                {
                    name: "groupId",
                    order: "ASC",
                },
            ],
        });

        await queryInterface.addIndex("group_posts", {
            name: "idx_gpost_user",
            fields: [
                {
                    name: "userId",
                    order: "ASC",
                },
            ],
        });

        await queryInterface.addConstraint("group_posts", {
            name: "fk_gpost_group",
            type: "foreign key",
            fields: [
                {
                    name: "groupId",
                },
            ],
            references: {
                table: "groups",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "no action",
        });

        await queryInterface.addConstraint("group_posts", {
            name: "fk_gpost_user",
            type: "foreign key",
            fields: [
                {
                    name: "userId",
                },
            ],
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "no action",
            onUpdate: "no action",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("group_posts");
    },
};
