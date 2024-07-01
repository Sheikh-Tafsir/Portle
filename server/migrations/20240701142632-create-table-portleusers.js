'use strict';

/** @type {import('sequelize-cli').Migration} */
const UserModel = require('../src/user/model/UserModel');
module.exports = {
  async up (queryInterface, Sequelize) {
    await UserModel.sync({ force: true });
  },

  async down (queryInterface, Sequelize) {
    await UserModel.drop();
  }
};