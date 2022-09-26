const { DataTypes } = require('sequelize');
const { genSaltSync, hashSync, compareSync } = require('bcrypt');
const { sequelize } = require('../../config/index');
const Role = require('../role/model');
const Dapartment = require('../dapartment/model');
const Section = require('../section/model');

const User = sequelize.define(
  'user',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true,
    },

    employeeNo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: ' This username is already taken',
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value) {
        const salt = genSaltSync(10);
        this.setDataValue('password', hashSync(value, salt));
      },
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    dapartementId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Dapartment,
        key: 'id',
      },
    },

    sectionId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Section,
        key: 'id',
      },
    },

    roleId: {
      type: DataTypes.INTEGER,
      references: {
        model: Role,
        key: 'id',
      },
    },
  },
  {
    tableName: 'tblUser',
  },
);

User.prototype.authenticate = function compare(password) {
  const pwgen = compareSync(password, this.password);

  if (pwgen) {
    return true;
  }
  return false;
};

module.exports = User;
