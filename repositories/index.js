const mongoService = require('../services/mongo')
// const mysqlService = require('../services/mysql')

// const util = require('util')
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
  // mongodb
  const mongoConnDB = await mongoService()

  // mysql
  // const mysqlConnection = await mysqlService()
  // promisify mysql query
  // const query = util.promisify(mysqlConnection.query).bind(mysqlConnection)

  appContext.repo = {
    user: new UserRepo(mongoConnDB)
  }
}
