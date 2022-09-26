const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const {
  getLocation, inputLocation, deleteLocation, editLocation,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', hasRole(2), getLocation);

// POST Router
router.post('/', hasRole(2), inputLocation);
router.post('/delete', hasRole(2), deleteLocation);

// PUT Router
router.put('/:id', hasRole(2), editLocation);

module.exports = router;
