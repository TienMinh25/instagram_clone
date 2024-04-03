"use strict";
const { Model } = require("sequelize");
const Group = require("./group.js");
const User = require("./user.js");
module.exports = (sequelize, DataTypes) => {
    class Group_follower extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Group_follower.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            groupId: {
                type: DataTypes.BIGINT,
                references: {
                    model: Group,
                    key: "id",
                },
            },
            userId: {
                type: DataTypes.BIGINT,
                references: {
                    model: User,
                    key: "id",
                },
            },
            type: DataTypes.SMALLINT(6),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Group_follower",
            tableName: "group_followers",
            indexes: [
                {
                    name: "idx_gpost_group",
                    fields: [
                        {
                            name: "idx_gpost_group",
                            order: "ASC",
                        },
                    ],
                },
                {
                    name: "idx_gpost_user",
                    fields: [
                        {
                            name: "userId",
                            order: "ASC",
                        },
                    ],
                },
            ],
        },
    );
    return Group_follower;
};
