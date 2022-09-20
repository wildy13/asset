const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config');

const Dapartment = sequelize.define(
  'dapartment',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    dapartmentCode: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'this dapartment is already in database',
      },
    },
  },
  {
    tableName: 'tblDapartment',
  },
);

module.exports = Dapartment;
