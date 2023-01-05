/* eslint-disable linebreak-style */
const Section = require('./model');
const Dapartment = require('../dapartment/model');

Section.hasOne(Dapartment, { foreignKey: 'id', sourceKey: 'dapartmentId' });
Dapartment.belongsTo(Section, { foreignKey: 'dapartmentId' });

module.exports = { Section, Dapartment };
