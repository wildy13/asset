const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config');

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
      allowNull: false,
    },
  },
  {
    tableName: 'tblSection',
  },
);

module.exports = Section;
