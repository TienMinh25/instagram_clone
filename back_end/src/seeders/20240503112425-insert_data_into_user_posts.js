'use strict';
const moment = require("moment");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('users', [
      {
        userId: 1,
        media: "/backend/src/upload/test.png",
        description: "Test 1, media default!",
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        userId: 2,
        media: "/backend/src/upload/test.png",
        description: "Test 2, media default!",
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        userId: 1,
        media: "/backend/src/upload/test.png",
        description: "Test 3, media default!",
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        userId: 3,
        media: "/backend/src/upload/test.png",
        description: "Test 1, media default!",
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      },
      {
        userId: 2,
        media: "/backend/src/upload/test.png$||$/backend/src/upload/test1.png",
        description: "Test 1, media default!",
        createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
        updatedAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('user_posts', null, {});
  }
};
