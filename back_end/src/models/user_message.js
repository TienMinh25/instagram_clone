"use strict";
const { Model, DATE } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User_message extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
        }
    }
    User_message.init(
        {
            id: { type: DataTypes.BIGINT, primaryKey: true },
            sourceId: DataTypes.BIGINT,
            targetId: DataTypes.BIGINT,
            message: DataTypes.TEXT("tiny"),
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: "User_message",
            tableName: "user_messages",
        },
    );
    return User_message;
};
