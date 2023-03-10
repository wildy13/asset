/* eslint-disable linebreak-style */
const { Router } = require('express');
const { hasRole } = require('../auth/service');
const { generatePdf } = require('./pdf');

const router = new Router();

// Get Router
router.get('/download', hasRole(), generatePdf);

module.exports = router;
