const express = require('express');
const router = express.Router();
const { login, register, getMe, validateSession, logout } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.get('/session', validateSession);
router.post('/session', validateSession);
router.get('/validate-token', validateSession);
router.post('/validate-token', validateSession);
router.get('/me', getMe);
router.post('/me', getMe);
router.post('/logout', logout);

module.exports = router;