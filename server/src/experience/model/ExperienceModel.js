// UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file
const UserModel = require('../../user/model/UserModel');

const ExperienceModel = sequelize.define('portleexperiences', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    position: {
      type: DataTypes.STRING,
      allowNull: true
    },
    dates: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
);

// Define associations
ExperienceModel.belongsTo(UserModel, {
  foreignKey: 'userId',
});

module.exports = ExperienceModel;
