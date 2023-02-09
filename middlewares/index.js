const { errorResponse } = require('../helpers/response')

/**
 * Middleware that catch whole error
 * @param {import('../index').AppContext} ctx
 */
const middlewareErrorWrapper = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.app.emit('error', err, ctx)
  }
}

/**
 * Check Content-type must be application/json
 * Middleware that catch whole error
 * @param {import('../index').AppContext} ctx
 */
const shouldJSON = async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.badRequest(errorResponse(400, 'Content-type application/json required'))
  } else {
    await next()
  }
}

/**
 * Response Time
 * Middleware that catch whole error
 * @param {import('../index').AppContext} ctx
 */
const responseTime = async (ctx, next) => {
  const start = Date.now()
  await next()
  const ms = Date.now() - start
  ctx.set('X-Response-Time', `${ms}ms`)
}

module.exports = {
  middlewareErrorWrapper,
  responseTime,
  shouldJSON
}
