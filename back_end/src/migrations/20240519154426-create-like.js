"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("likes", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.BIGINT,
            },
            postId: {
                type: Sequelize.BIGINT,
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

        await queryInterface.addConstraint('likes', {
          fields: ['userId'],
          name: 'fk_user_like',
          type: 'foreign key',
          references: {
            table: 'users',
            field: 'id',
          }
        })

        await queryInterface.addConstraint("likes", {
          fields: ["postId"],
          name: "fk_post_like",
          type: "foreign key",
          references: {
              table: "user_posts",
              field: "id",
          },
      });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("likes");
    },
};
