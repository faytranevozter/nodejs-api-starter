const Router = require('koa-router')
const router = new Router()

router.get('/v1', (ctx) => {
  return ctx.ok({
    message: process.env.APP_NAME || 'It works!'
  })
})

module.exports = router
