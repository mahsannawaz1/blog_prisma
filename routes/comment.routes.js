const router = require('express').Router()
const authenticateUser = require('../middlewares/user.auth_middleware')
const createCommentController = require('../controllers/comment.create_controller')
const getAllCommentsWithParentController = require('../controllers/comment.getParent_controller')
const deleteCommentController = require('../controllers/comment.delete_controller')

router.post('/:id/comments', authenticateUser, createCommentController)

router.get('/:id/comments', authenticateUser, getAllCommentsWithParentController)

router.delete('/:id/comments/:commentId', authenticateUser, deleteCommentController)

module.exports = router
