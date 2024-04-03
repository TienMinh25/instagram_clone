"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("group_followers", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20),
            },
            groupId: {
                type: Sequelize.BIGINT(20),
            },
            userId: {
                type: Sequelize.BIGINT(20),
            },
            type: {
                type: Sequelize.SMALLINT(6),
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

        await queryInterface.addIndex("group_followers", {
            name: "idx_gfollower_group",
            fields: [
                {
                    name: "groupId",
                    order: "ASC",
                },
            ],
        });

        await queryInterface.addIndex("group_followers", {
            name: "idx_gfollower_user",
            fields: [
                {
                    name: "userId",
                    order: "ASC",
                },
            ],
        });

        await queryInterface.addConstraint("group_followers", {
            name: "fk_gfollower_group",
            type: "foreign key",
            fields: ["groupId"],
            references: {
                table: "groups",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "no action",
        });

        await queryInterface.addConstraint("group_followers", {
            name: "fk_gfollower_user",
            type: "foreign key",
            fields: ["userId"],
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "no action",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("group_followers");
    },
};
