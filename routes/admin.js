const express = require('express');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/login', adminController.getLogin);

module.exports = router;