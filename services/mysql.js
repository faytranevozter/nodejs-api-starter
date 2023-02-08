const mysql = require('mysql2')

/**
 * Connect to mysql server
 * @returns {(import('mysql2').Connection | import('mysql2').QueryError)}
 */
module.exports = async () => {
  return new Promise((resolve, reject) => {
    const connectionOptions = process.env.MYSQL_URI ?? {
      host: process.env.MYSQL_HOST || 'localhost',
      port: process.env.MYSQL_PORT || 3306,
      user: process.env.MYSQL_USERNAME || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DBNAME || ''
    }
    const connection = mysql.createConnection(connectionOptions)
    connection.connect((err) => {
      console.log(err)
      if (err === null) {
        resolve(connection)
      } else {
        reject(err)
      }
    })
  })
}
