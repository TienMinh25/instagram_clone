"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Like extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Like.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });

            Like.belongsTo(models.User_post, {
                foreignKey: "postId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });
        }
    }
    Like.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            userId: DataTypes.BIGINT,
            postId: DataTypes.BIGINT,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            tableName: "likes",
            modelName: "Like",
        },
    );
    return Like;
};
