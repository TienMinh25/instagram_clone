'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.addColumn('user_posts', 'path_media', {
      type: DataTypes.TEXT,
      allowNull:true,
    })
    await queryInterface.changeColumn('user_posts', 'media',{
      type:DataTypes.TEXT,
      allowNull:false,
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.removeColumn('user_posts', 'path_media')
    await queryInterface.changeColumn('user_posts', 'media', {
      type:DataTypes.BLOB,
      allowNull:true,
    })
  }
};
