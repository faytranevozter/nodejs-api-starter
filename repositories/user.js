const { mongoDB } = require('../services/mongo')
const collectionName = 'users'

const getUser = async (email) => {
  try {
    const res = (await mongoDB()).collection(collectionName).findOne({
      email: email
    })
    return res
  } catch (err) {
    console.error('Error getUser :', err)
    return false
  }
}

module.exports = {
  getUser
}
