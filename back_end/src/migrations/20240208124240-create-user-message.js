"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("user_messages", {
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
            message: {
                type: Sequelize.TEXT("tiny"),
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

        await queryInterface.addIndex("user_messages", ["sourceId"], {
            name: "idx_umessage_source",
        });

        await queryInterface.addIndex("user_messages", ["targetId"], {
            name: "idx_umessage_target",
        });

        await queryInterface.addConstraint("user_messages", {
            fields: ["sourceId"],
            type: "foreign key",
            name: "fk_umessage_source",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "no action",
            onUpdate: "cascade",
        });

        await queryInterface.addConstraint("user_messages", {
            fields: ["targetId"],
            type: "foreign key",
            name: "fk_umessage_target",
            references: {
                table: "users",
                field: "id",
            },
            onDelete: "NO ACTION",
            onUpdate: "cascade",
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("user_messages");
    },
};
