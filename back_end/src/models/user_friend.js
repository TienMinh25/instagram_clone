"use strict";
const { Model } = require("sequelize");
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
    class User_friend extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User_friend.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            sourceId: {
                type: DataTypes.BIGINT,
                references: {
                    model: User,
                    key: "id",
                },
            },
            targetId: {
                type: DataTypes.BIGINT,
                references: {
                    model: User,
                    key: "id",
                },
            },
            type: DataTypes.SMALLINT,
            status: DataTypes.SMALLINT,
            notes: DataTypes.TEXT,
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "User_friend",
            tableName: "user_friends",
            indexes: [
                {
                    fields: ["sourceId"],
                    name: "idx_friend_source",
                },
                {
                    fields: ["targetId"],
                    name: "idx_friend_target",
                },
            ],
        },
    );
    return User_friend;
};
