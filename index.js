require('dotenv').config()
const Koa = require('koa')
const KoaRouter = require('koa-router')
const BodyParser = require('koa-bodyparser')
const Helmet = require('koa-helmet')
const Cors = require('@koa/cors')
const Respond = require('koa-respond')
const morgan = require('koa-morgan')

// Middlewares
const Middlewares = require('./middlewares')

// initialiaze KOA
const app = new Koa()

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
    strict: true
  })
)

app.use(Respond())
app.use(Middlewares.responseTime)

// Declare Routes
const router = new KoaRouter()

// default route
router.get('/', (ctx) => {
  ctx.type = 'json'
  ctx.body = {
    message: process.env.APP_NAME || 'It works!'
  }
})

// endpoint from routes
router.use('/api', require('./routes/api').routes())

// Router Middleware - that wrap rules to entire routing protocol
app.use(router.routes()).use(router.allowedMethods())

// error handling via event emitter. Still figuring out the best way to populate all errors
app.on('error', (err, ctx) => {
  const errorCode = (err.error && err.error.code) ? err.error.code : 500
  console.error(err)
  ctx.send(errorCode, {
    status: errorCode,
    message: err.message || 'Error occurred.',
    validation: {},
    data: {}
  })
})

if (process.env.NODE_ENV === 'test') {
  module.exports = app.listen()
} else {
  const port = process.env.PORT || 3000
  app.listen(port, () =>
    console.log('Service started on port ' + port)
  )
}
