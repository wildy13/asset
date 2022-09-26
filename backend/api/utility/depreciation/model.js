const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../config');
const Category = require('../category/model');
const SubCategory = require('../subCategory/model');

const Depreciation = sequelize.define(
  'depreciation',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rate: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Category,
        key: 'id',
      },
    },
    subcategoryId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: SubCategory,
        key: 'id',
      },
    },
  },
  {
    tableName: 'tblDepreciation',
  },
);

module.exports = Depreciation;
