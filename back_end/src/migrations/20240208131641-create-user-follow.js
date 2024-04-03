"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("user_follows", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.BIGINT(20),
            },
            sourceId: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
            },
            targetId: {
                type: Sequelize.BIGINT(20),
                allowNull: false,
            },
            type: {
                type: Sequelize.SMALLINT(6),
                allowNull: false,
                defaultValue: 0,
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

        await queryInterface.addIndex("user_follows", {
            fields: [
                {
                    name: "sourceId",
                    order: "ASC",
                },
            ],
            name: "idx_ufollower_source",
        });

        await queryInterface.addIndex("user_follows", {
            fields: [
                {
                    name: "targetId",
                    order: "ASC",
                },
            ],
            name: "idx_ufollower_target",
        });

        await queryInterface.addConstraint("user_follows", {
            fields: ["sourceId"],
            name: "fk_ufollower_source",
            type: "foreign key",
            references: {
                field: "id",
                table: "users",
            },
        });

        await queryInterface.addConstraint("user_follows", {
            fields: ["targetId"],
            name: "idx_ufollower_target",
            type: "foreign key",
            references: {
                field: "id",
                table: "users",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user_follows");
    },
};
