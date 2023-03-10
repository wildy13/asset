const { Router } = require('express');
const { isAdmin, isAuthenticated } = require('../auth/service');
const {
  getSection, filterSection, inputSection, deleteSection, editSection,
} = require('./controller');

const router = new Router();

// Get Router
router.get('/', isAuthenticated(), getSection);

// POST Router
router.post('/', isAdmin(), inputSection);
router.post('/delete', isAdmin(), deleteSection);
router.post('/filter', filterSection);

// PUT Router
router.put('/:id', isAdmin(), editSection);

module.exports = router;
