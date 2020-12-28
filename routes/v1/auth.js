const Router = require('koa-router')
const router = new Router()
const AuthController = require('../../controllers/authController')

router.post('/login', AuthController.login)

module.exports = router
