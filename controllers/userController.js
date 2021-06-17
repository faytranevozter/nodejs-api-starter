const { successResponse, errorResponse } = require('../helpers/response')
const { getUser } = require('../repositories/user')

const detail = async (ctx, next) => {
  try {
    // get email from query param
    const query = ctx.query || {}
    if (!query.email) {
      return ctx.badRequest(
        errorResponse(400, 'Email param required')
      )
    }

    // get from repository
    const user = await getUser(query.email)
    if (user) {
      return ctx.ok(
        successResponse(user)
      )
    }

    // throw error on non exist data
    return ctx.badRequest(
      errorResponse(400, 'User not found')
    )
  } catch (err) {
    console.error(err)
    return ctx.throw(err.error.code, err)
  }
}

module.exports = {
  detail
}
