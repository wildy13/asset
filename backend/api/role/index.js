const { Router } = require('express');
const { isAdmin, isAuthenticated } = require('../auth/service');
const {
  getRole, inputRole, deleteRoles, editRoles,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', isAuthenticated(), getRole);

// POST Router
router.post('/', isAdmin(), inputRole);
router.post('/delete', isAdmin(), deleteRoles);

// PUT Router
router.put('/:id', isAdmin(), editRoles);

module.exports = router;
