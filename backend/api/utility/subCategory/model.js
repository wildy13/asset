const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config');

const SubCategory = sequelize.define(
  'subcategory',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    subcategoryCode: {
      type: DataTypes.CHAR,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    tableName: 'tblSubCategory',
  },
);

module.exports = SubCategory;
