const { Router } = require('express');
const { getUser, getMe, createUser, deleteUsers, editUsers, changePassword } = require('./controller');
const { isAuthenticated, hasRole, isAdmin } = require('../auth/service');

const router = new Router();

// Get Router
router.get('/',  getUser);
router.get('/me', isAuthenticated(),  getMe);

// POST Router
router.post('/',  isAdmin(),createUser);
router.post('/delete' ,isAdmin(), deleteUsers)

//PUT Router
router.put('/:id',isAdmin(), editUsers)
router.put('/change-password', changePassword)

module.exports = router;
