const auth = require('./api/auth');
const user = require('./api/user');
const role = require('./api/role');
const dapartment = require('./api/dapartment');
const section = require('./api/section')
const currency = require('./api/utility/currency')
const category = require('./api/utility/category')
const subcategory = require('./api/utility/subCategory')
const location = require('./api/utility/location')
 const depreciation = require('./api/utility/depreciation')

const router = (app) => {
  app.use('/api/auth', auth);
  app.use('/api/user', user);
  app.use('/api/role', role);
  app.use('/api/dapartment', dapartment)
  app.use('/api/section', section)
  app.use('/api/utility/currency', currency)
  app.use('/api/utility/category', category)
  app.use('/api/utility/subCategory', subcategory)
  app.use('/api/utility/location', location)
  app.use('/api/utility/depreciation', depreciation);
};

module.exports = router;
