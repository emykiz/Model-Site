const express = require('express')

const { search, editUser, addCoverImage, addProfileImage } = require('../controllers/user')
const { upload } = require('../utils/image-upload')
const { verifyToken } = require('../middlewares/jwt-auth')

const router = express.Router()

router.post('/edit/profile-picture/:id', [verifyToken, upload.single('image')], addProfileImage)

router.post('/edit/cover-picture/:id', [verifyToken, upload.single('image')], addCoverImage)

module.exports = router