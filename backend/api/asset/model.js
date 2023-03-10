/* eslint-disable linebreak-style */
const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config');

const Assets = sequelize.define(
  'assets',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'this section is already in database',
      },
    },
    brandModel: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    condition: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dapartmentId: {
      type: DataTypes.INTEGER,
    },
    sectionId: {
      type: DataTypes.INTEGER,
    },
    po: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currencyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    exchange: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
    },
    method: {
      type: DataTypes.STRING,
    },
    rate: {
      type: DataTypes.DECIMAL,
    },
    year: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'tblAssets',
  },
);

module.exports = Assets;
