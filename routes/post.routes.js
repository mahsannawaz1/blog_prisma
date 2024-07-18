const router = require('express').Router()
const upload = require('../middlewares/multer.middleware')
const authenticateUser = require('../middlewares/user.auth_middleware')
const createPostController = require('../controllers/post.create_controller')
const getAllPostsController = require('../controllers/post.getAll_controller')
const getPostByIdController = require('../controllers/post.getById_controller')

router.post('/', authenticateUser, upload.single('image'), createPostController)

router.get('/', getAllPostsController)

router.get('/:id', getPostByIdController)

module.exports = router