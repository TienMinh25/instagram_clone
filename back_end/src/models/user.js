"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class User extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            // oke
            // quan he n-n cua user voi user thong qua model User_friend
            // 1 user co the co nhieu ban be
            User.belongsToMany(User, {
                through: models.User_friend,
                foreignKey: "targetId",
                otherKey: "sourceId",
                as: "Friend",
            });

            // oke
            User.belongsToMany(User, {
                through: models.User_friend,
                foreignKey: "sourceId",
                otherKey: "targetId",
                as: "User",
            });

            // quan he n-n cuar user voi user thong qua model User_message (1 user co the nhan tin voi nhieu user)
            User.belongsToMany(User, {
                through: models.User_message,
                foreignKey: "sourceId",
                otherKey: "targetId",
                as: "UserSend",
            });

            User.belongsToMany(User, {
                through: models.User_message,
                foreignKey: "targetId",
                otherKey: "sourceId",
                as: "UserReceive",
            });

            // oke
            // quan he 1 - n: 1 user co the co 0, 1, n bai post
            User.hasMany(models.User_post, {
                foreignKey: "userId",
                sourceKey: "id",
            });

            // oke
            // quan he n - n giua cac user, 1 user co the follow nhieu user
            User.belongsToMany(User, {
                through: models.User_follow,
                foreignKey: "sourceId",
                otherKey: "targetId",
                as: "UserFollower",
            });

            // oke
            User.belongsToMany(User, {
                through: models.User_follow,
                foreignKey: "targetId",
                otherKey: "sourceId",
                as: "UserFollowing",
            });

            // oke
            // quan he 1-n voi group, 1 user co the tao ra 0, 1 hoac nhieu group
            User.hasMany(models.Group, {
                foreignKey: "createdBy",
                sourceKey: "id",
            });

            // oke
            // quan he 1-n voi group, 1 user co the cap nhat 0, 1 hoac nhieu group
            User.hasMany(models.Group, {
                foreignKey: "updatedBy",
                sourceKey: "id",
            });

            // oke
            // quan he n-n cua 1 user co the co nhieu group, 1 group co the co nhieu user
            User.belongsToMany(models.Group, {
                through: models.Group_message,
                foreignKey: "userId",
                otherKey: "groupId",
            });

            // oke
            // quan he n-n cua 1 user co the co trong nhieu group,
            // 1 group co the co nhieu user
            User.belongsToMany(models.Group, {
                through: models.Group_member,
                foreignKey: "userId",
                otherKey: "groupId",
            });

            // oke
            // quan he 1 - n cua user voi group post
            User.hasMany(models.Group_post, {
                sourceKey: "id",
                foreignKey: "userId",
            });

            // oke
            // quan he n-n cua group va user, 1 user co the follow nhieu group
            // 1 group co the co nhieu user follow
            User.belongsToMany(models.Group, {
                through: models.Group_follower,
                foreignKey: "userId",
                otherKey: "groupId",
            });

            User.belongsToMany(models.User_post, {
                through: models.Like,
                foreignKey: 'userId',
                otherKey: 'postId',
            })

            User.belongsToMany(models.User_post, {
                through: models.Comment,
                foreignKey: 'userId',
                otherKey: 'postId',
            })
        }
    }
    User.init(
        {
            id: {
                type: DataTypes.BIGINT,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            username: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            name_tag: {
                type: DataTypes.STRING(100),
                allowNull: false,
                validate: {
                    notEmpty: true,
                },
            },
            mobile: {
                type: DataTypes.STRING(15),
                allowNull: true,
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: true,
            },
            passwordHash: {
                type: DataTypes.TEXT("medium"),
                allowNull: true,
            },
            lastLogin: {
                type: DataTypes.DATE,
                allowNull: true,
                defaultValue: null,
            },
            intro: {
                type: DataTypes.TEXT("tiny"),
                allowNull: true,
                defaultValue: null,
            },
            avatar: {
                type: DataTypes.TEXT("medium"),
                defaultValue: null,
                allowNull: true,
            },
            createdAt: { type: DataTypes.DATE, defaultValue: Date.now() },
            updatedAt: { type: DataTypes.DATE, defaultValue: Date.now() },
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            indexes: [
                {
                    fields: ["username"],
                    name: "uq_username",
                    unique: true,
                },
                {
                    fields: ["mobile"],
                    name: "uq_mobile",
                },
                {
                    fields: ["email"],
                    name: "uq_email",
                    unique: true,
                },
            ],
        },
    );
    return User;
};
