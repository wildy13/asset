const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config');

const Category = sequelize.define(
  'category',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    categoryCode: {
      type: DataTypes.CHAR,
      primaryKey: true,
      allowNull: false,
      unique: {
        args: true,
        msg: 'this CODE is already in database',
      },
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: {
        args: true,
        msg: 'this category is already in database',
      },
    },
  },
  {
    tableName: 'tblCategory',
  },
);

module.exports = Category;
