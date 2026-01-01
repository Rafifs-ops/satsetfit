const express = require('express');
const router = express.Router();
const { validatePremExp, upgradePrem } = require('../controllers/premiumController');

router.post('/validate-exp', validatePremExp);
router.post('/upgrade-prem', upgradePrem);

module.exports = router;