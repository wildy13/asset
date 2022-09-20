const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const { getCategory, inputCategory, deleteCategory, editCategory } = require('./controller');

const router = new Router();

// Get Router
router.get('/',hasRole(2), getCategory);

// POST Router
router.post('/',hasRole(2), inputCategory);
router.post('/delete',hasRole(2), deleteCategory)

//PUT Router
router.put('/:id',hasRole(2), editCategory)

module.exports = router;