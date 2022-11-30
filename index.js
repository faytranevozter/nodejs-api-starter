require('dotenv').config()
const Koa = require('koa')
const KoaRouter = require('koa-router')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const Cors = require('@koa/cors')
const Respond = require('koa-respond')
const morgan = require('koa-morgan')
const Sentry = require('@sentry/node')

// Middlewares
const Middlewares = require('./middlewares')

// initialiaze KOA
const app = new Koa()

/**
 * @typedef {import('koa').BaseContext & import('./repositories').ContextRepo} AppContext
 */

// middleware for handling error
app.use(Middlewares.middlewareErrorWrapper)
if (['dev', 'development'].includes(process.env.NODE_ENV)) {
  app.use(morgan('combined'))
}

app.use(Helmet())

app.use(
  Cors({
    origin: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 1728000,
    optionsSuccessStatus: 200
  })
)

app.use(
  BodyParser({
    enableTypes: ['json'],
    jsonLimit: '5mb',
    strict: true,
    onerror: (_err, ctx) => {
      ctx.status = 422
      ctx.throw(_err.message, 422)
    }
  })
)

app.use(Respond())
app.use(Middlewares.responseTime)

// Declare Routes
const router = new KoaRouter()

require('./repositories')(app.context)

// default route
router.get('/', (ctx) => {
  ctx.type = 'json'
  ctx.body = {
    message: process.env.APP_NAME || 'It works!'
  }
})

// route is manageable from routes directory
router.use('', require('./routes/api').routes())

// Router Middleware - that wrap rules to entire routing protocol
app.use(router.routes()).use(router.allowedMethods())

// sentry
Sentry.init({
  environment: process.env.NODE_ENV || 'prod',
  release: '1.0.0'
})

// error handling
app.on('error', (err, ctx) => {
  // sentry
  Sentry.withScope(function (scope) {
    scope.addEventProcessor(function (event) {
      return Sentry.Handlers.parseRequest(event, ctx.request)
    })
    Sentry.captureException(err)
  })

  ctx.status = ctx.status === 404 ? 500 : ctx.status
  ctx.body = {
    status: ctx.status,
    message: err.message ?? 'Something went wrong',
    validation: {},
    data: {}
  }
})

const port = process.env.PORT || 3000
app.listen(port, () =>
  console.log('Service started on port ' + port)
)
