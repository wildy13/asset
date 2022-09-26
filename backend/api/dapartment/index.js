const { Router } = require('express');
const { isAdmin } = require('../auth/service');
const {
  getDapartment, inputDapartment, deleteDapartment, editDapartment,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', isAdmin(), getDapartment);

// POST Router
router.post('/', isAdmin(), inputDapartment);
router.post('/delete', isAdmin(), deleteDapartment);

// PUT Router
router.put('/:id', isAdmin(), editDapartment);

module.exports = router;
