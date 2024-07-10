const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRouter = require('./routes/articles');
const categoriesRouter = require('./routes/categories');

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/articles', articleRouter);
app.use('/categories', categoriesRouter);

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
