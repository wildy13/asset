const { Router } = require('express');
const { hasRole } = require('../auth/controller');
const {
  getAssets, inputAssets, deleteAssets, editAssets,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', hasRole(1), getAssets);

// POST Router
router.post('/', hasRole(1), inputAssets);
router.post('/delete', hasRole(1), deleteAssets);

// PUT Router
router.put('/:id', hasRole(1), editAssets);

module.exports = router;
