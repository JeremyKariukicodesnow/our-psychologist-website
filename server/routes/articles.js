const express = require('express')
const router = express.Router()
const Article = require('../models/Article')
const Category = require('../models/Category')

//Get all Articles
router.get('/', async (req, res) => {
    try {
        const articles = await Article.find().populate('category')
        res.json(articles).status(200)
    } catch (err) {
        res.status(500).json({ message: 'Could not find articles' })
    }
})
//Get articles by category
router.get('/category/:categoryId', async (req, res) => {
    try {
        const articles = await Article.find({ category: req.params.categoryId }).populate('category')
        res.json(articles)
    } catch (err) {
        res.status(500).json({ message: 'Could not find articles' })
    }
})

//Get one article
router.get('/:id', getArticle, (req, res) => {
    res.json(res.article).status(200)
})

//Create an article
router.post('/', async (req, res) => {
    try {
        const category = await Category.findById(req.body.categoryId)
        if (!category) {
            return res.status(400).json({ message: 'No such category at the moment' })
        }


        const article = new Article({
            title: req.body.title,
            introduction: req.body.introduction,
            body: req.body.body,
            conclusion: req.body.conclusion
        })

        const newArticle = await article.save()
        res.status(201).json(newArticle)
    } catch (err) {
        res.status(400).json({ message: 'Article not created' })
    }
})

//To get a single user
async function getArticle(req, res, next) {
    let article
    try {
        article = await Article.findById(req.params.id).populate('category')
        if (article == null) {
            return res.status(404).json({ message: 'Cannot find article' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
    res.article = article
    next()
}

module.exports = router