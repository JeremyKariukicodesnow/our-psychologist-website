const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const articleRouter = require('./routes/articles');
const userRouter = require('./routes/getUser');  // Assuming 'getUser' is the correct name

const scheduleRouter = require('./routes/schedule');
const chatRoutes = require('./routes/chat');  // Import the chat routes

dotenv.config();

const app = express();

// Database connection
connectDB();

// Middleware
app.use(cors());

// Express.json() handles JSON payloads, limit size to 100mb
app.use(express.json({ limit: '100mb' }));

// Body-parser handles URL-encoded payloads, limit size to 100mb
app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/articles', articleRouter);

app.use('/psychology', userRouter);  // Ensure route prefix consistency
app.use('/api/schedule', scheduleRouter);  // Ensure route prefix consistency
app.use('/api/chat', chatRoutes);  // Add the chatbot route

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).send(`Server error: ${err.message}`);
});

// Start server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
