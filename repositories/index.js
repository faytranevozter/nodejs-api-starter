const mongo = require('../services/mongo')
const UserRepo = require('./user')

module.exports = async (appContext = {}) => {
  // connect db
  const mongoCon = await mongo()

  // assign repositories
  appContext.userRepo = new UserRepo(mongoCon)
}
