const express = require('express')
const multer = require('multer')
const multerConfig = require('./config/multer')

const UserController = require('./controllers/UserController')
const PostController = require('./controllers/PostController')
const ComentController = require('./controllers/ComentController')

const authMiddleware = require('./middlewares/authMiddleware')
const AuthController = require('./controllers/AuthController')

const router = express.Router()

const upload = multer(multerConfig)

router.post('/login', AuthController.create)

router.post('/users', UserController.create)
router.get('/posts', PostController.index)
router.get('/posts/:id', PostController.show)

router.use(authMiddleware)
router.get('/users', UserController.show)
router.post('/posts', upload.single('file'), PostController.create)
router.delete('/posts/:id', PostController.remove)

router.post('/comments/:post_id', ComentController.create)
router.get('/comments', ComentController.index)
router.delete('/comments/:id', ComentController.remove)

module.exports = router
