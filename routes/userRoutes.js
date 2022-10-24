const router = require('express').Router()
const userController = require('./../controller/userController')

const authMiddleware = require('./../middlewares/auth-middleware')

router.post('/users/register', userController.register)
router.post('/users/login', userController.login)

router.use(authMiddleware)

router.post('/users/add_admin', userController.admin)
router.get('/user/status', userController.userSatatus)


module.exports = router