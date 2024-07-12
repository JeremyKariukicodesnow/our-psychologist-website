const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRouter = require('./routes/articles');
const userRouter = require('./routes/getUser');  // Assuming 'getUser' is the correct name
const categoriesRouter = require('./routes/categories');
const scheduleRouter = require('./routes/schedule')

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json({ limit: '100mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRouter);
app.use('/api/categories', categoriesRouter);
app.use('/psychology', userRouter);  // Ensure route prefix consistency
app.use('/api/schedule', scheduleRouter);  // Ensure route prefix consistency


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
