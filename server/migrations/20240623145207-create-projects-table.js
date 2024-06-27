'use strict';

/** @type {import('sequelize-cli').Migration} */
const ProjectsModel = require('../src/projects/model/ProjectsModel');
module.exports = {
  async up (queryInterface, Sequelize) {
    await ProjectsModel.sync({ force: true });
  },

  async down (queryInterface, Sequelize) {
    await ProjectsModel.drop();
  }
};