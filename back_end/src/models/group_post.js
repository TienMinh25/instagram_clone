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

      // quan he 1 - nhieu giua group post va user
      Group_post.belongsToMany(models.User, {
        foreignKey: "userId",
      });

      // quan he 1 - nhieu giua group post va group
      Group_post.belongsToMany(models.Group, {
        foreignKey: "groupId",
      });
    }
  }
  Group_post.init(
    {
      id: DataTypes.BIGINT(20),
      groupId: DataTypes.BIGINT(20),
      userId: DataTypes.BIGINT(20),
      content: DataTypes.TEXT,
      createdAd: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "group_post",
      tableName: "group_posts",
    }
  );
  return Group_post;
};
