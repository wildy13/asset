/* eslint-disable linebreak-style */
const User = require('./model');
const Dapartment = require('../dapartment/model');
const Section = require('../section/model');
const Role = require('../role/model');

User.hasOne(Dapartment, { foreignKey: 'id', sourceKey: 'dapartementId' });
Dapartment.belongsTo(User, { foreignKey: 'dapartementId' });

User.hasOne(Section, { foreignKey: 'id', sourceKey: 'sectionId' });
Section.belongsTo(User, { foreignKey: 'sectionId' });

User.hasOne(Role, { foreignKey: 'id', sourceKey: 'roleId' });
Role.belongsTo(User, { foreignKey: 'roleId' });

module.exports = {
  User, Section, Dapartment, Role,
};
