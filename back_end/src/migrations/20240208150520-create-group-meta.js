"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("group_meta", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20),
            },
            groupId: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
                unique: true,
            },
            key: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            content: {
                type: Sequelize.TEXT,
                defaultValue: null,
            },
            createdAt: {
                type: Sequelize.DATE,
            },
            updatedAt: {
                type: Sequelize.DATE,
            },
        });

        await queryInterface.addIndex("group_meta", {
            name: "idx_meta_group",
            fields: [
                {
                    name: "groupId",
                    order: "ASC",
                },
            ],
        });

        await queryInterface.addIndex("group_meta", {
            name: "uq_meta_group",
            fields: [
                {
                    name: "groupId",
                    order: "ASC",
                },
                {
                    name: "key",
                    order: "ASC",
                },
            ],
            type: "UNIQUE",
        });

        await queryInterface.addConstraint("group_meta", {
            type: "foreign key",
            name: "fk_meta_group",
            fields: ["groupId"],
            references: {
                table: "groups",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "no action",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("group_meta");
    },
};
