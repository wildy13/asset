const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const { getCurrency, inputCurrency, deleteCurrency, editCurrency } = require('./controller');

const router = new Router();

// Get Router
router.get('/',hasRole(2), getCurrency);

// POST Router
router.post('/',hasRole(2), inputCurrency);
router.post('/delete',hasRole(2), deleteCurrency)

//PUT Router
router.put('/:id',hasRole(2), editCurrency)

module.exports = router;