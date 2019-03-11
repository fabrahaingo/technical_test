const { dbInit } = require('../models/dbInit')

// Get decisions returned from specified query.
// DB = database instance
// JURISDICTION_NAME = specific jurisdiction name
function getDecisionsFromDb(db, jurisdiction_name) {
    return new Promise(async (resolve) => {
        const decisions = await db.all(`
        SELECT doc_id, title
        FROM decisions
        WHERE formation = 'CHAMBRE_CRIMINELLE'
        AND (title LIKE '%' || ? || '%')
        AND (solution LIKE '%cassation%')
        AND dec_date > '1980/01/01'
        ORDER BY dec_date DESC
        LIMIT 10`
    , [jurisdiction_name]).catch((err) => {
            console.log('Error in getDecisionFromDb() SQL request: ' + err.message)
        });
        console.log(decisions);
        resolve(decisions);
    }).catch((err) => {
        console.log('Error in getDecision(): ' + err.message);
    })
}


// Get jurisdiction name for its id. -> ex: "Cour de cassasion" or "Conseil d'État"
// DB = database instance
// JURISDICTION_ID = specific jurisdiction id
function getJurisdictionName(db, jurisdiction_id) {
    return new Promise(async (resolve) => {
        const jurisdictionName = await db.all(`
        SELECT name
        FROM jurisdictions
        WHERE jurisdiction_id = ?`
    , jurisdiction_id).catch((err) => {
            console.log('Error in getJurisdictionName() SQL request: ' + err.message)
        });
        resolve(jurisdictionName[0].name);
    }).catch((err) => {
        console.log('Error in getJurisdictionName(): ' + err.message);
    })
}

// Return final topDecisions object.
// DB = database instance
// JURISDICTION_ID = specific jurisdiction id
function topDecisions(db, jurisdiction_id) {
    return new Promise(async (resolve) => {
        let topDecisionsArray = new Array();
        let jurisdiction_name = await getJurisdictionName(db, jurisdiction_id)
        topDecisionsArray = await getDecisionsFromDb(db, jurisdiction_name);
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
    jurisdiction_top_decisions = await topDecisions(db, jurisdiction_id);

    return res.json({
        jurisdiction_top_decisions
    })
};
