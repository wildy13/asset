const { DataTypes } = require('sequelize')
const { sequelize } = require('../../../config')

const Location = sequelize.define(
    'location',
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
              msg: 'this location is already in database',
            },
          },
    },
    {
        tableName: 'tblLocation',
    }
)

module.exports = Location;