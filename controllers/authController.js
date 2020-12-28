const { successResponse } = require('../helpers/response')

const login = async (ctx, next) => {
  try {
    return ctx.ok(
      successResponse({
        id: 1,
        name: 'John Smith',
        email: 'smithjohn@gmail.com'
      })
    )
  } catch (err) {
    console.error(err)
    return ctx.throw(err.error.code, err)
  }
}

module.exports = {
  login
}
