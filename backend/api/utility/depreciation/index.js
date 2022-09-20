const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const { getDepreciation, inputDepreciation, deleteDepreciation, editDepreciation } = require('./controller');

const router = new Router();

// Get Router
router.get('/',hasRole(2), getDepreciation);

// POST Router
router.post('/',hasRole(2), inputDepreciation);
router.post('/delete',hasRole(2), deleteDepreciation)

//PUT Router
router.put('/:id',hasRole(2), editDepreciation)

module.exports = router;