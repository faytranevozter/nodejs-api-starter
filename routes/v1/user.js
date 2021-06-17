const Router = require('koa-router')
const router = new Router()
const UserController = require('../../controllers/userController')

router.get('/detail', UserController.detail)

module.exports = router
