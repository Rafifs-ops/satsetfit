const express = require('express');
const router = express.Router();
const { 
    login, 
    register, 
    getMe, 
    validateSession, 
    logout, 
    verifyEmail, 
    resendOtp, 
    forgotPassword, 
    resetPassword 
} = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.post('/verify-email', verifyEmail);
router.post('/resend-otp', resendOtp);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.get('/session', validateSession);
router.post('/session', validateSession);
router.get('/validate-token', validateSession);
router.post('/validate-token', validateSession);
router.get('/me', getMe);
router.post('/me', getMe);
router.post('/logout', logout);

module.exports = router;