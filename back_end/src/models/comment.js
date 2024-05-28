"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Comment extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Comment.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });

            Comment.belongsTo(models.User_post, {
                foreignKey: "postId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });

            Comment.hasMany(Comment, {
                foreignKey: "parentComment",
                sourceKey: "id",
                as: "parentComments",
            });

            Comment.belongsTo(Comment, {
                foreignKey: "parentComment",
                sourceKey: "id",
                as: "childrenComments",
            });
        }
    }
    Comment.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            userId: DataTypes.BIGINT,
            postId: DataTypes.BIGINT,
            content: DataTypes.STRING,
            parentComment: { type: DataTypes.BIGINT, allowNull: true },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Comment",
            tableName: "comments",
        },
    );
    return Comment;
};
