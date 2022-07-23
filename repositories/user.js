module.exports = class UserRepo {
  #mongo
  #collectionName = 'users'

  constructor (mongo) {
    this.#mongo = mongo
  }

  async getUserByEmail (email) {
    try {
      const res = this.#mongo.collection(this.#collectionName).findOne({
        email
      })
      return res
    } catch (err) {
      console.error('Error getUser :', err)
      return false
    }
  }
}
