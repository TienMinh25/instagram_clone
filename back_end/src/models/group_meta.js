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
            // oke
            // moi quan he 1 1 giua bang group meta(bang bo sung them thong tin cho group) voi bang group
            Group_meta.belongsTo(models.Group, {
                foreignKey: "groupId",
                targetKey: "id",
                onDelete: "cascade",
                onUpdate: "no action",
            });
        }
    }
    Group_meta.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            groupId: DataTypes.BIGINT,
            key: DataTypes.STRING,
            content: DataTypes.TEXT,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Group_meta",
            tableName: "group_meta",
        },
    );
    return Group_meta;
};
