"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("group_members", {
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
            roleId: {
                type: Sequelize.SMALLINT(6),
                allowNull: false,
                defaultValue: 0,
            },
            status: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: 0,
            },
            notes: {
                type: Sequelize.TEXT,
                defaultValue: null,
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

        await queryInterface.addIndex("group_members", {
            name: "idx_member_group",
            fields: [
                {
                    name: "groupId",
                    order: "ASC",
                },
            ],
        });

        await queryInterface.addIndex("group_members", {
            name: "idx_member_user",
            fields: [
                {
                    name: "userId",
                    order: "ASC",
                },
            ],
        });

        await queryInterface.addConstraint("group_members", {
            type: "unique",
            name: "uq_friend",
            fields: ["groupId", "userId"],
        });

        await queryInterface.addConstraint("group_members", {
            type: "foreign key",
            name: "fk_member_group",
            fields: ["groupId"],
            references: {
                table: "groups",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "no action",
        });

        await queryInterface.addConstraint("group_members", {
            type: "foreign key",
            name: "fk_member_user",
            fields: ["userId"],
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "no action",
            onUpdate: "no action",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("group_members");
    },
};
