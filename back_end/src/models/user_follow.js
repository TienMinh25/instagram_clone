"use strict";
const { Model } = require("sequelize");
const User = require("./user");
module.exports = (sequelize, DataTypes) => {
    class User_follow extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User_follow.init(
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
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "User_follow",
            tableName: "user_follows",
        },
    );
    return User_follow;
};
