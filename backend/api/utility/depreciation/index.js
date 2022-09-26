const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const {
  getDepreciation, inputDepreciation, deleteDepreciation, editDepreciation, filterDepreciation,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', hasRole(1), getDepreciation);

// POST Router
router.post('/', hasRole(1), inputDepreciation);
router.post('/delete', hasRole(1), deleteDepreciation);
router.post('/filter', hasRole(1), filterDepreciation);
// PUT Router
router.put('/:id', hasRole(1), editDepreciation);

module.exports = router;
