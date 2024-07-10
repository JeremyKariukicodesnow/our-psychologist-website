const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() });
const { login, register } = require('../middleware/authMiddleware');

router.post('/register', upload.single('profilePic'), register);
router.post('/login', login);

module.exports = router;
