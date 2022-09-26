const { DataTypes } = require('sequelize');
const { sequelize } = require('../../config');
const Dapartment = require('../dapartment/model');
const Section = require('../section/model');
const Category = require('../utility/category/model');
const SubCategory = require('../utility/subCategory/model');
const Currency = require('../utility/currency/model');

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
      references: {
        model: Dapartment,
        key: 'id',
      },
    },
    sectiontId: {
      type: DataTypes.INTEGER,
      references: {
        model: Section,
        key: 'id',
      },
    },
    po: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    currencyId: {
      type: DataTypes.INTEGER,
      references: {
        model: Currency,
        key: 'id',
      },
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
      allowNull: false,
    },
    method: {
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
  },
  {
    tableName: 'tblAssets',
  },
);

module.exports = Assets;
