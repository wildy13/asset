const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config');

const Currency = sequelize.define(
  'currency',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencySymbol: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'this currency is already in database',
      },
    },
  },
  {
    tableName: 'tblCurrency',
  },
);

module.exports = Currency;
