const { Router } = require('express');
const { isAdmin, isAuthenticated } = require('../auth/service');
const {
  getDapartment, inputDapartment, deleteDapartment, editDapartment,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', isAuthenticated(), getDapartment);

// POST Router
router.post('/', isAdmin(), inputDapartment);
router.post('/delete', isAdmin(), deleteDapartment);

// PUT Router
router.put('/:id', isAdmin(), editDapartment);

module.exports = router;
