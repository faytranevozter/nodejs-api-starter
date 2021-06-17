const Router = require('koa-router')
const router = new Router()

// sample
router.use('/auth', require('./auth').routes())

router.use('/user', require('./user').routes())

// sample with middleware
// router.use('/profile', middleware, require('./role').routes())

// sample with route from another file
// router.use('/products', require('./product').routes())

module.exports = router
