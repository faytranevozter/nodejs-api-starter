const mongo = require('../services/mongo')
const UserRepo = require('./user')

/**
 * @typedef {Object} ContextRepo
 * @property {ListRepo} repo
 *
 * @typedef {Object} ListRepo
 * @property {UserRepo} user
 */

/**
 * @param {import('koa').BaseContext} appContext
 */
module.exports = async (appContext = {}) => {
  // connect db
  const mongoCon = await mongo()

  appContext.repo = {
    user: new UserRepo(mongoCon)
  }
}
