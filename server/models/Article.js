const mongoose = require('mongoose');

const ArticleSchema = new mongoose.Schema({
    title: { type: String, required: true },
    url: { type: String, required: true },
    img_thumb: { type: String, required: true }, 
    description: { type: String, required: true },
});

module.exports = mongoose.model('Article', ArticleSchema);