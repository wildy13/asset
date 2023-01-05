const { Router } = require('express');
const { hasRole } = require('../auth/service');
const {
  getAssets, inputAssets, deleteAssets, editAssets, generatePdf,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', hasRole(1), getAssets);
router.get('/download', generatePdf);

// POST Router
router.post('/', inputAssets);
router.post('/delete', hasRole(1), deleteAssets);

// PUT Router
router.put('/:id', hasRole(1), editAssets);

module.exports = router;
