const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config');
const Dapartment = require('../dapartment/model');

const Section = sequelize.define(
  'section',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    sectionCode: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'this section is already in database',
      },
    },
    dapartmentId: {
      type: DataTypes.INTEGER,
      references: {
        model: Dapartment,
        key: 'id',
      },
    },
  },
  {
    tableName: 'tblSection',
  },
);

module.exports = Section;
