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
        await queryInterface.createTable("group_messages", {
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
                type: Sequelize.BIGINT,
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
                allowNull: true,
                defaultValue: null,
                type: Sequelize.DATE,
            },
        });

        queryInterface.addIndex("group_messages", {
            name: "idx_gmessage_group",
            fields: [
                {
                    name: "groupId",
                    order: "ASC",
                },
            ],
        });

        queryInterface.addIndex("group_messages", {
            name: "idx_gmessage_user",
            fields: [
                {
                    name: "userId",
                    order: "ASC",
                },
            ],
        });

        queryInterface.addConstraint("group_messages", {
            fields: ["groupId"],
            type: "foreign key",
            name: "fk_gmessage_group",
            references: {
                table: "groups",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "no action",
        });

        queryInterface.addConstraint("group_messages", {
            fields: ["userId"],
            type: "foreign key",
            name: "fk_gmessage_user",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "no action",
            onUpdate: "no action",
        });
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable("group_messages");
    },
};
