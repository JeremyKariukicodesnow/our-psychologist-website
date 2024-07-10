// server.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRouter = require('./routes/articles');
const userRouter = require('./routes/getUser');  // assuming you named it 'getUser'
const categoriesRouter = require('./routes/categories');

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json())
app.use(bodyParser.json({ limit: '100mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/articles', articleRouter);
app.use('/categories', categoriesRouter);
app.use('/psychology', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(`Server error: ${err.message}`);
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
