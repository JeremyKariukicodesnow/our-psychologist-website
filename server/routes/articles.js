const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const Article = require('../models/Article')
//const Category = require('../models/Category')


// Set up storage for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });
//Get all Articles
router.get('/articles', async (req, res) => {
    try {
        const articles = await Article.find()
        res.json(articles).status(200)
    } catch (err) {
        res.status(500).json({ message: 'Could not find articles' })
    }
})

//Get one article
router.get('/articles/:id', getArticle, (req, res) => {
    res.json(res.article).status(200)
})

// Get articles by author
router.get('/articles/author/:username', async (req, res) => {
    console.log(`Fetching articles for author: ${req.params.username}`); // Log the username
    try {
        const articles = await Article.find({ author: req.params.username });
        res.json(articles).status(200);
    } catch (err) {
        console.error('Error fetching articles:', err); // Log the error
        res.status(500).json({ message: 'Could not find articles' });
    }
});


//Create an article
router.post('/articles', async (req, res) => {
    console.log('Request body:', req.body) // Add this line for logging
    try {

        const article = new Article({
            title: req.body.title,
            introduction: req.body.introduction,
            body: req.body.body,
            conclusion: req.body.conclusion,
            //category: req.body.categoryId,
            author: req.body.author
        })

        const newArticle = await article.save()
        res.status(201).json(newArticle)
    } catch (err) {
        console.log(err)
        res.status(400).json({ message: 'Article not created' })
    }
})

// Update an article
router.put('/articles/:id', getArticle, async (req, res) => {
    console.log('')
    if (req.body.title != null) {
        res.article.title = req.body.title
    }
    if (req.body.introduction != null) {
        res.article.introduction = req.body.introduction
    }
    if (req.body.body != null) {
        res.article.body = req.body.body
    }
    if (req.body.conclusion != null) {
        res.article.conclusion = req.body.conclusion
    }
    // if (req.body.categoryId != null) {
    //     res.article.category = req.body.categoryId
    // }
    if (req.body.author != null) {
        res.article.author = req.body.author
    }

    try {
        const updatedArticle = await res.article.save()
        res.status(200).json(updatedArticle)
    } catch (err) {
        res.status(400).json({ message: 'Could not update article' })
    }
})

//delete
router.delete('/articles/:id', getArticle, async (req, res) => {
    try {
        await res.article.deleteOne()
        res.status(200).json({ message: 'Article deleted successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Could not delete article' })
    }
})

//To get a single article
async function getArticle(req, res, next) {
    let article
    try {
        article = await Article.findById(req.params.id)
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