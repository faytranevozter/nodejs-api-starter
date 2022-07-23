const { MongoClient } = require('mongodb')

module.exports = async () => {
  // Connection URL
  const url = process.env.MONGO_URL || 'mongodb://localhost:27017'
  const db = process.env.MONGO_DATABASE || 'node_starter'

  const client = new MongoClient(url, {
    maxPoolSize: 10,
    useUnifiedTopology: true,
    useNewUrlParser: true
  })

  try {
    // Use connect method to connect to the Server
    await client.connect()
    return client.db(db)
  } catch (err) {
    console.error(err.stack)
  }
}
