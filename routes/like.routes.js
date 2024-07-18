const router = require('express').Router()
const authenticateUser = require('../middlewares/user.auth_middleware')
const createLikeController  =require('../controllers/like.create_controller.js')

router.post('/:id/likes', authenticateUser, createLikeController)

module.exports = router