const express = require('express');
const router = express.Router();
const { getAllProducts, getAllArticles } = require('../controllers/dataController');

router.get('/products', getAllProducts);
router.get('/articles', getAllArticles);

module.exports = router;