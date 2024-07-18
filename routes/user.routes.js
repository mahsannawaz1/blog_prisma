const router = require('express').Router()
const upload = require('../middlewares/multer.middleware')
const userRegisterController = require('../controllers/user.register_controller')
const userLoginController = require('../controllers/user.login_controller')

router.post('/users',upload.single('profile'),userRegisterController)

router.post('/login', userLoginController)

module.exports = router


