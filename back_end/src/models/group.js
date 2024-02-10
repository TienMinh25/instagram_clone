"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      // 1 hoac nhieu group duoc tao boi 1 user
      Group.belongsTo(models.User, {
        foreignKey: "createdBy",
        as: "UserCreated",
      });

      // 1 hoac nhieu group duoc cap nhat boi 1 user
      Group.belongsTo(models.User, {
        foreignKey: "updatedBy",
        as: "UserUpdated",
      });

      // quan he n-n cua 1 user co the co nhieu group message trong nhieu group, 1 group message
      // trong 1 group co the co nhieu user
      Group.belongsToMany(models.User, {
        through: models.Group_message,
        foreignKey: "groupId",
        otherKey: "userId",
      });

      // quan he n-n cua 1 user co the co trong nhieu group,
      // 1 group co the co nhieu user
      Group.belongsToMany(models.User, {
        through: models.Group_member,
        foreignKey: "groupId",
        otherKey: "userId",
      });

      // moi quan he 1-1
      Group.hasOne(models.Group_meta);

      // quan he 1 - n cua group va group post
      Group.hasOne(models.Group_post);

      // quan he n-n cua group va user, 1 user co the follow nhieu group
      // 1 group co the co nhieu user follow
      Group.belongsToMany(models.User, {
        through: models.Group_follower,
        foreignKey: "groupId",
        otherKey: "userId",
      });
    }
  }
  Group.init(
    {
      id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
      },
      createdBy: DataTypes.BIGINT,
      updatedBy: DataTypes.BIGINT,
      title: DataTypes.STRING(75),
      metaTitle: DataTypes.STRING,
      slug: DataTypes.STRING,
      summary: DataTypes.TEXT("tiny"),
      status: DataTypes.SMALLINT,
      profile: DataTypes.TEXT,
      content: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Group",
      tableName: "groups",
      indexes: [
        {
          fields: [
            {
              name: "slug",
              order: "ASC",
            },
          ],
          name: "uq_slug",
          type: "UNIQUE",
        },
        {
          name: "idx_group_modifier",
          fields: [
            {
              name: "updatedBy",
              order: "ASC",
            },
          ],
        },
        {
          name: "idx_group_creator",
          fields: [
            {
              name: "createdBy",
              order: "ASC",
            },
          ],
        },
      ],
    }
  );
  return Group;
};
