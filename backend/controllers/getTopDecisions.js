const { dbInit } = require('../models/dbInit')

// Get decisions returned from the specified query
function getDecisionsFromDb(db) {
    return new Promise(async (resolve) => {
        const decisions = await db.all(`
        SELECT doc_id, title
        FROM decisions
        WHERE formation = 'CHAMBRE_CRIMINELLE'
        AND (solution LIKE '%cassation%')
        AND dec_date > '1980/01/01'
        ORDER BY dec_date DESC
        LIMIT 10`).catch((err) => {
            console.log('Error in getDecision() SQL request: ' + err.message)
        });
        resolve(decisions);
    }).catch((err) => {
        console.log('Error in getDecision(): ' + err.message);
    })
}

// Return the final topDecisions object
function topDecisions(db) {
    return new Promise(async (resolve) => {
        let topDecisionsArray = new Array();
        topDecisionsArray = await getDecisionsFromDb(db);
        resolve(topDecisionsArray);
    }).catch((err) => {
        console.log('Error in topDecisions(): ' + err.message);
    })
}

module.exports = async function getTopDecisions(req, res) {
    let jurisdiction_id = req.query.jurisdiction_id;
    let jurisdiction_top_decisions = new Array();

    //INSERT YOUR CODE HERE
    const db = await dbInit();
    jurisdiction_top_decisions = await topDecisions(db);

    return res.json({
        jurisdiction_top_decisions
    })
};
