const Product = require('../models/Product')
const Article = require('../models/Article')

exports.getAllProducts = async (req, res) => {
    try {
        const data = await Product.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.getAllArticles = async (req, res) => {
    try {
        const data = await Article.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};