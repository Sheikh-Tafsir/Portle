'use strict';

/** @type {import('sequelize-cli').Migration} */
const ExperiencesModel = require('../src/experience/model/ExperienceModel');
module.exports = {
  async up (queryInterface, Sequelize) {
    await ExperiencesModel.sync({ force: true });
  },

  async down (queryInterface, Sequelize) {
    await ExperiencesModel.drop();
  }
};