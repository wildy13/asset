const { Router } = require('express');
const { isAdmin } = require('../auth/service');
const { getSection, filterSection, inputSection, deleteSection, editSection } = require('./controller');

const router = new Router();

// Get Router
router.get('/',isAdmin(), getSection);

// POST Router
router.post('/' ,isAdmin(), inputSection);
router.post('/delete',isAdmin(), deleteSection)
router.post('/filter',isAdmin(), filterSection);

//PUT Router
router.put('/:id',isAdmin(), editSection)

module.exports = router;