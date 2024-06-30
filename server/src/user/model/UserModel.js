// UserModel.js
const { DataTypes } = require('sequelize');
const sequelize = require('../../../config/sequalizeConfig'); // Assuming your Sequelize instance is defined in a separate file

const UserModel = sequelize.define('portleusers', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    designation: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    github: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    cv: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  },
  {
      timestamps: false // Disable automatic timestamp tracking
  }
);

module.exports = UserModel;