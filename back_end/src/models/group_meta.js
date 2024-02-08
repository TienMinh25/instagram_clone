"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Group_meta extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // moi quan he 1 1 giua bang group meta(bang bo sung them thong tin cho group) voi bang group
      Group_meta.belongsTo(models.Group, {
        foreignKey: "groupId",
      });
    }
  }
  Group_meta.init(
    {
      id: DataTypes.BIGINT(20),
      groupId: DataTypes.BIGINT(20),
      key: DataTypes.STRING,
      content: DataTypes.TEXT,
      createdAt: DataTypes.DATE,
      updatedAt: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Group_meta",
      tableName: "group_meta",
    }
  );
  return Group_meta;
};
