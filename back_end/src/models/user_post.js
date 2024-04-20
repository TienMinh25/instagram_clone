"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User_post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // oke
            // 1 bai post chi co the thuoc ve 1 user ( quan he 1-n voi user)
            User_post.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });
        }
    }
    User_post.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            userId: DataTypes.BIGINT,
            media: DataTypes.TEXT,
            description: DataTypes.TEXT,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "User_post",
            tableName: "user_posts",
            indexes: [
                {
                    fields: [
                        {
                            name: "userId",
                            order: "ASC",
                        },
                    ],
                    name: "idx_upost_user",
                },
            ],
        },
    );
    return User_post;
};
