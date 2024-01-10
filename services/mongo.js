const { MongoClient } = require('mongodb')

/**
 * Connect to mongodb server
 * @returns {(import('mongodb').Db | null)}
 */
module.exports = async () => {
  // Connection URL
  const url = process.env.MONGO_URI || 'mongodb://localhost:27017/dbname'

  const client = new MongoClient(url, {
    maxPoolSize: 10
  })

  try {
    // Use connect method to connect to the Server
    await client.connect()
    return client.db()
  } catch (err) {
    console.error(err.stack)
    return null
  }
}
