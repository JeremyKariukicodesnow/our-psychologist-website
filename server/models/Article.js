const mongoose = require('mongoose')
const Category = require('./Category')

const ArticleSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    introduction: {
        type: String,
        required: true
    },
    body: {
        type: [
            {
                sectionTitle: String,
                content: String
            },
        ],
        required: true
    },
    conclusion: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: String,
        default: 'Anonymous'
    }
})

module.exports = mongoose.model('Article', ArticleSchema)