const express = require('express')
const router = express.Router();
const {login , register} = require('../middleware/authMiddleware')

router.post('/register' , register)
router.post('/login' , login)

module.exports = router