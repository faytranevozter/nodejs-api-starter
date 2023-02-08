module.exports = class UserRepo {
  /**
   * @type {import('mongodb').Db}
   */
  #mongo

  /**
   * @type {String}
   */
  #collectionName = 'users'

  /**
   *
   * @param {import('mongodb').Db} mongo
   */
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
