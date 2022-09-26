const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config');
const Category = require('../category/model');

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
      references: {
        model: Category,
        key: 'id',
      },
    },
  },
  {
    tableName: 'tblSubCategory',
  },
);

module.exports = SubCategory;
