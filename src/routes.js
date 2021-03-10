const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const PostController = require('./controllers/PostController')
const UserController = require('./controllers/UserController')

const router = express.Router()

const upload = multer(multerConfig)

router.post('/users', UserController.create)
router.post('/posts', upload.single('file'), PostController.create)
router.get('/posts', PostController.index)

module.exports = router
