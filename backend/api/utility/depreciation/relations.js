/* eslint-disable linebreak-style */
const Depreciation = require('./model');
const Category = require('../category/model');
const SubCategory = require('../subCategory/model');

Depreciation.hasOne(Category, { foreignKey: 'id', sourceKey: 'categoryId' });
Category.belongsTo(Depreciation, { foreignKey: 'categoryId' });

Depreciation.hasOne(SubCategory, { foreignKey: 'id', sourceKey: 'subcategoryId' });
SubCategory.belongsTo(Depreciation, { foreignKey: 'subcategoryId' });

module.exports = {
  Depreciation, Category, SubCategory,
};
