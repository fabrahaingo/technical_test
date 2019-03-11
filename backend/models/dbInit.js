const sqlite = require('sqlite')
const Promise = require('bluebird')

async function dbInit() {
  return await sqlite.open('sqlite_db', { Promise })
}
module.exports.dbInit = dbInit
