const { dbInit } = require('../models/dbInit')

module.exports = async function(req, res) {
  let jurisdiction_id = req.params.jurisdiction_id

  const db = await dbInit()
  let row = await db.get(`
    SELECT *
    FROM jurisdictions
    WHERE jurisdiction_id = ?`
  , [jurisdiction_id])

  if (row == null)
    throw(new Error('Could not find jurisdiction'))

  res.json({ jurisdiction_infos: row })
}
