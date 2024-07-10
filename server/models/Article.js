const mongoose = require('mongoose')
//const Category = require('./Category')

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
        type: String,
        required: true
    },
    conclusion: {
        type: String,
        required: true
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'Category'
    // },
    imageUrl: {
        type: String
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