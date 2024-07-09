require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

//Middleware
app.use(cors())
app.use(bodyParser.json())


//Database connection
mongoose.connect(process.env.MONGO_URI)
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Databse'))


//Routes
const articleRouter = require('./routes/articles')
const categoriesRouter = require('./routes/categories')
app.use('/articles', articleRouter)
app.use('/categories', categoriesRouter)

//Start server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`))