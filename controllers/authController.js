const { successResponse } = require('../helpers/response')

/**
 * @param {import('../index').AppContext} ctx
 */
const login = async (ctx) => {
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
