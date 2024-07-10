const express = require('express')
const router = express.Router()
const Category = require('../models/Category')

//Get all categories
router.get('/categories', async (req, res) => {
    try {
        const categories = await Category.find()
        res.json(categories)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

//Create category
router.post('/categories', async (req, res) => {
    const category = new Category({
        name: req.body.name
    })
    try {
        const newCategory = await category.save()
        res.status(201).json(newCategory)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

module.exports = router