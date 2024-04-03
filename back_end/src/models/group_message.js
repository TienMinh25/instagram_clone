"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Group_message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    Group_message.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            groupId: DataTypes.BIGINT,
            userId: DataTypes.BIGINT,
            message: DataTypes.TEXT("tiny"),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "Group_message",
            tableName: "group_messages",
            indexes: [
                {
                    name: "idx_gmessage_group",
                    fields: [
                        {
                            name: "groupId",
                            order: "ASC",
                        },
                    ],
                },
                {
                    name: "idx_gmessage_user",
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
    return Group_message;
};
