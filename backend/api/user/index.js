const { Router } = require('express');
const {
  getUser, getMe, createUser, deleteUsers, editUsers, changePassword,
} = require('./controller');
const { isAuthenticated, isAdmin } = require('../auth/service');

const router = new Router();

// Get Router
router.get('/', isAuthenticated(), getUser);
router.get('/me', isAuthenticated(), getMe);

// POST Router
router.post('/', isAdmin(), createUser);
router.post('/delete', isAdmin(), deleteUsers);

// PUT Router
router.put('/:id', isAdmin(), editUsers);
router.post('/change/:id', isAuthenticated(), changePassword);
module.exports = router;
