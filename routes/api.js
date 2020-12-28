const Router = require('koa-router')
const router = new Router()

router.use('/v1', require('./v1').routes())

module.exports = router
