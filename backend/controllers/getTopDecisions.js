const { dbInit } = require('../models/dbInit');
const functions = require('./functions/topDecisions');

module.exports = async function getTopDecisions(req, res) {
    let jurisdiction_id = req.query.jurisdiction_id;
    let jurisdiction_top_decisions = new Array();

    //INSERT YOUR CODE HERE
    const db = await dbInit();
    jurisdiction_top_decisions = await functions.topDecisions(db, jurisdiction_id);

    return res.json({
        jurisdiction_top_decisions
    })
};
