"use strict";
const { Model } = require("sequelize");
const User = require("./user.js");
const Group = require("./group.js");
module.exports = (sequelize, DataTypes) => {
    class Group_member extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Group_member.init(
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
            roleId: DataTypes.SMALLINT(6),
            status: DataTypes.SMALLINT(6),
            notes: DataTypes.TEXT,
        },
        {
            sequelize,
            modelName: "Group_member",
            tableName: "group_members",
            indexes: [
                {
                    name: "idx_member_group",
                    fields: [
                        {
                            name: "groupId",
                            order: "ASC",
                        },
                    ],
                },
                {
                    name: "idx_member_user",
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
    return Group_member;
};
