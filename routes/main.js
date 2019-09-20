const express = require('express');

const router = express.Router();

const mainController = require('../controllers/main');

router.get('/', mainController.getHome);

router.post('/section-entry', mainController.postSectionEntry);

router.get('/section/:sectionId/dashboard', mainController.getSectionSpecificDashboard);

router.get('/section/:sectionId/timetable', mainController.getTimetable);

module.exports = router;