const express = require('express')

const { signin, signup } = require('../controllers/auth')
const { verifyToken } = require('../middlewares/jwt-auth')

const router = express.Router()

router.post('/signup', verifyToken, signup)

router.post('/signin', signin)

module.exports = router