const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const { getDepreciation, inputDepreciation, deleteDepreciation, editDepreciation } = require('./controller');

const router = new Router();

// Get Router
router.get('/',hasRole(1), getDepreciation);

// POST Router
router.post('/',hasRole(1), inputDepreciation);
router.post('/delete',hasRole(1), deleteDepreciation)

//PUT Router
router.put('/:id',hasRole(1), editDepreciation)

module.exports = router;