const express = require('express')
require('dotenv').config();
const cors = require('cors')
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const authRoutes = require('./routes/authRoutes')

const app = express()

connectDB()

app.use(cors())
app.use(bodyParser.json({limit: '50mb'}))

app.use(express.json());

app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000

try {
    const messageListen =`app listening at port ${port}`
    app.listen(port , console.log(messageListen))
} catch (error) {
    console.log(error.message)
}