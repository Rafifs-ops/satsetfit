const express = require('express');
const router = express.Router();
const { getAllProducts, getAllArticles } = require('../controllers/dataController');

router.post('/products', getAllProducts);
router.post('/articles', getAllArticles);

module.exports = router;