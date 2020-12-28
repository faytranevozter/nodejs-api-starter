const { errorResponse } = require('../helpers/response')

// Middleware that catch whole error
const middlewareErrorWrapper = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.app.emit('error', err, ctx)
  }
}

// Check Headers
const shouldJSON = async (ctx, next) => {
  if (!ctx.is('application/json')) {
    ctx.throw(errorResponse(400, 'Content-type application/json required'))
  } else {
    await next()
  }
}

// Response Time
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
