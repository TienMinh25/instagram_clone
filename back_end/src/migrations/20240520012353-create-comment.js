  "use strict";
  /** @type {import('sequelize-cli').Migration} */
  module.exports = {
      async up(queryInterface, Sequelize) {
          await queryInterface.createTable("comments", {
              id: {
                  allowNull: false,
                  autoIncrement: true,
                  primaryKey: true,
                  type: Sequelize.BIGINT,
              },
              userId: {
                  type: Sequelize.BIGINT,
              },
              postId: {
                  type: Sequelize.BIGINT,
              },
              content: {
                  type: Sequelize.STRING,
              },
              parentComment: {
                  type: Sequelize.BIGINT,
                  references: {
                    model: 'comments',
                    key: 'id',
                  },
                  onDelete: 'cascade',
                  allowNull: true,
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

          await queryInterface.addConstraint("comments", {
              fields: ["userId"],
              name: "fk_uid_comment",
              type: "foreign key",
              references: {
                  table: "users",
                  field: "id",
              },
          });

          await queryInterface.addConstraint("comments", {
              fields: ["postId"],
              name: "fk_pid_comment",
              type: "foreign key",
              references: {
                  table: "user_posts",
                  field: "id",
              },
          });
      },
      async down(queryInterface, Sequelize) {
          await queryInterface.dropTable("comments");
      },
  };
