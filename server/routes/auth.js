const express = require('express');
const router = express.Router();
const { login, register, getMe } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/me', getMe);

module.exports = router;