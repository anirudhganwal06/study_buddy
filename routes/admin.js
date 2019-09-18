const express = require('express');

const adminIsAuth = require('../middlewares/adminIsAuth');
const adminIsNotAuth = require('../middlewares/adminIsNotAuth');

const router = express.Router();

const adminController = require('../controllers/admin');

router.get('/login', adminIsNotAuth, adminController.getLogin);

router.post('/login', adminIsNotAuth, adminController.postLogin);

router.post('/signup', adminIsNotAuth, adminController.postSignup);

router.post('/:userId/logout', adminIsAuth, adminController.postLogout);

router.get('/:userId/dashboard', adminIsAuth, adminController.getDashboard);

module.exports = router;