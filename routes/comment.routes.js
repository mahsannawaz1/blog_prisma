const router = require('express').Router()
const authenticateUser = require('../middlewares/user.auth_middleware')
const createCommentController = require('../controllers/comment.create_controller')

router.post('/:id/comments', authenticateUser, createCommentController)

module.exports = router
