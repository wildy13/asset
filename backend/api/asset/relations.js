/* eslint-disable linebreak-style */
const Assets = require('./model');
const Category = require('../utility/category/model');
const SubCategory = require('../utility/subCategory/model');
const Dapartment = require('../dapartment/model');
const Section = require('../section/model');
const Currency = require('../utility/currency/model');

Assets.hasOne(Category, { foreignKey: 'id', sourceKey: 'categoryId' });
Category.belongsTo(Assets, { foreignKey: 'categoryId' });

Assets.hasOne(SubCategory, { foreignKey: 'id', sourceKey: 'subcategoryId' });
SubCategory.belongsTo(Assets, { foreignKey: 'subcategoryId' });

Assets.hasOne(Dapartment, { foreignKey: 'id', sourceKey: 'dapartmentId' });
Dapartment.belongsTo(Assets, { foreignKey: 'dapartmentId' });

Assets.hasOne(Section, { foreignKey: 'id', sourceKey: 'sectionId' });
Section.belongsTo(Assets, { foreignKey: 'sectionId' });

Assets.hasOne(Currency, { foreignKey: 'id', sourceKey: 'currencyId' });
Currency.belongsTo(Assets, { foreignKey: 'currencyId' });

module.exports = {
  Assets, Category, SubCategory, Dapartment, Section, Currency,
};
