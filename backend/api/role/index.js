const { Router } = require('express');
const { isAdmin } = require('../auth/service');
const {
  getRole, inputRole, deleteRoles, editRoles,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', isAdmin(), getRole);

// POST Router
router.post('/', isAdmin(), inputRole);
router.post('/delete', isAdmin(), deleteRoles);

// PUT Router
router.put('/:id', isAdmin(), editRoles);

module.exports = router;
