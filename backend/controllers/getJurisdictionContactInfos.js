const { dbInit } = require('../models/dbInit');
const functions = require('./functions/jurisdictionContactInfos');

module.exports = async function getJurisdictionContactInfos(req, res) {
  let jurisdiction_id = req.query.jurisdiction_id;
  let jurisdiction_contact_infos = Object.create(null);

  //INSERT YOUR CODE HERE
  const db = await dbInit();
  jurisdiction_contact_infos = await functions.createVerifiedContactObject(db, jurisdiction_contact_infos, jurisdiction_id);

  return res.json({
    jurisdiction_contact_infos
  });
};
