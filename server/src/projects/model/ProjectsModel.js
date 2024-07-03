// UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file
const UserModel = require('../../user/model/UserModel');

const ProjectsModel = sequelize.define('portleprojects', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    technology: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    livelink: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    githublink: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
);
// Define associations
ProjectsModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

module.exports = ProjectsModel;
