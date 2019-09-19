const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getHome);

router.get('/timetable', mainController.getTimetable);

module.exports = router;