const express = require('express');
const router = express.Router();
const { chatbot } = require('../controllers/aiController');

router.post('/chatbot', chatbot);

module.exports = router;