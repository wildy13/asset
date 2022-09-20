const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const { getSubCategory, inputSubCategory, deleteSubCategory, editSubCategory } = require('./controller');

const router = new Router();

// Get Router
router.get('/',hasRole(), getSubCategory);

// POST Router
router.post('/',hasRole(), inputSubCategory);
router.post('/delete',hasRole(), deleteSubCategory)

//PUT Router
router.put('/:id',hasRole(), editSubCategory)

module.exports = router;