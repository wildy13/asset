/* eslint-disable linebreak-style */
const SubCategory = require('./model');
const Category = require('../category/model');

SubCategory.hasOne(Category, { foreignKey: 'id', sourceKey: 'categoryId' });
Category.belongsTo(SubCategory, { foreignKey: 'categoryId' });

module.exports = { SubCategory, Category };
