"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("groups", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20),
            },
            createdBy: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
            },
            updatedBy: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
            },
            title: {
                type: Sequelize.STRING(75),
                allowNull: false,
            },
            metaTitle: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            slug: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            summary: {
                type: Sequelize.TEXT("tiny"),
            },
            status: {
                type: Sequelize.SMALLINT,
                defaultValue: 0,
                allowNull: false,
            },
            profile: {
                type: Sequelize.TEXT,
                allowNull: true,
                defaultValue: null,
            },
            content: {
                type: Sequelize.TEXT,
                allowNull: true,
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

        queryInterface.addIndex("groups", {
            name: "uq_slug",
            fields: [
                {
                    name: "slug",
                    order: "ASC",
                },
            ],
            type: "UNIQUE",
        });

        queryInterface.addIndex("groups", {
            name: "idx_group_modifier",
            fields: [
                {
                    name: "updatedBy",
                    order: "ASC",
                },
            ],
        });

        queryInterface.addIndex("groups", {
            name: "idx_group_creator",
            fields: [
                {
                    name: "createdBy",
                    order: "ASC",
                },
            ],
        });

        queryInterface.addConstraint("groups", {
            name: "fk_group_creator",
            type: "foreign key",
            fields: ["createdBy"],
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "no action",
            onUpdate: "cascade",
        });

        queryInterface.addConstraint("groups", {
            name: "fk_group_modifier",
            type: "foreign key",
            fields: ["updatedBy"],
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "no action",
            onUpdate: "cascade",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("groups");
    },
};
