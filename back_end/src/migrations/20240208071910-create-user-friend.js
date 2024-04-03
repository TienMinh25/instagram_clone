"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("user_friends", {
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
                type: Sequelize.SMALLINT,
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

        await queryInterface.addIndex("user_friends", ["sourceId"], {
            name: "idx_friend_source",
        });

        await queryInterface.addIndex("user_friends", ["targetId"], {
            name: "idx_friend_target",
        });

        await queryInterface.addConstraint("user_friends", {
            fields: ["sourceId"],
            type: "foreign key",
            name: "fk_friend_source",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });

        await queryInterface.addConstraint("user_friends", {
            fields: ["targetId"],
            type: "foreign key",
            name: "fk_friend_target",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "cascade",
            onUpdate: "cascade",
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user_friends");
    },
};
