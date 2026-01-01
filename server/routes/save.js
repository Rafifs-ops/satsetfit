const express = require('express');
const router = express.Router();
const { saveCalcResult } = require('../controllers/saveController');

router.post('/calc-result', saveCalcResult);

module.exports = router;