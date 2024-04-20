"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Group_post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // oke
            // quan he 1 - nhieu giua group post va user
            Group_post.belongsTo(models.User, {
                foreignKey: "userId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });

            // oke
            // quan he 1 - nhieu giua group post va group
            Group_post.belongsTo(models.Group, {
                foreignKey: "groupId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });
        }
    }
    Group_post.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            groupId: DataTypes.BIGINT,
            userId: DataTypes.BIGINT,
            content: DataTypes.TEXT,
            createdAd: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Group_post",
            tableName: "group_posts",
        },
    );
    return Group_post;
};
