const express = require('express');
const router = express.Router();
const { getAllProducts } = require('../controllers/productController');
const { getAllArticles } = require('../controllers/articleController');

router.post('/products', getAllProducts);
router.post('/articles', getAllArticles);

module.exports = router;