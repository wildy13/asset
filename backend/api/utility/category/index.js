const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const {
  getCategory, inputCategory, deleteCategory, editCategory,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', hasRole(1), getCategory);

// POST Router
router.post('/', inputCategory);
router.post('/delete', hasRole(1), deleteCategory);

// PUT Router
router.put('/:id', hasRole(1), editCategory);

module.exports = router;
