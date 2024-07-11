const express = require('express');
const multer = require('multer');
const router = express.Router();
const { login, register } = require('../middleware/authMiddleware');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/register', upload.single('profilePic'), register);
router.post('/login', login);

module.exports = router;
