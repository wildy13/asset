const { Router } = require('express');
const { hasRole } = require('../../auth/service');
const { getSubCategory, filterSubCategory, inputSubCategory, deleteSubCategory, editSubCategory } = require('./controller');

const router = new Router();

// Get Router
router.get('/',hasRole(1), getSubCategory);

// POST Router
router.post('/',hasRole(1), inputSubCategory);
router.post('/delete',hasRole(1), deleteSubCategory)
router.post('/filter', hasRole(1), filterSubCategory);

//PUT Router
router.put('/:id',hasRole(1), editSubCategory)

module.exports = router;