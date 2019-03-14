// Get decisions returned from specified query.
// DB = database instance
// JURISDICTION_NAME = specific jurisdiction name
exports.getDecisionsFromDb = function getDecisionsFromDb(db, jurisdiction_name) {
    if (!db || !jurisdiction_name)
        return (new Object())
    return new Promise(async (resolve, reject) => {
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
            reject(new Error('Error in getDecisionFromDb() SQL request: ' + err.message))
        });
        if (decisions)
            resolve(decisions)
        else
            resolve(new Object())
    })
}

// Get jurisdiction name for its id. -> ex: "Cour de cassasion" or "Conseil d'État"
// DB = database instance
// JURISDICTION_ID = specific jurisdiction id
exports.getJurisdictionName = function getJurisdictionName(db, jurisdiction_id) {
    if (!db || !jurisdiction_id)
        return (new String().valueOf())
    return new Promise(async (resolve) => {
        const jurisdictionName = await db.get(`
        SELECT name
        FROM jurisdictions
        WHERE jurisdiction_id = ?`
    , jurisdiction_id).catch((err) => {
        reject(new Error('Error in getJurisdictionName() SQL request: ' + err.message))
        });
        if (jurisdictionName)
            resolve(jurisdictionName.name);
        else
            resolve(new String().valueOf());
    }).catch((err) => {
        reject(new Error('Error in getJurisdictionName(): ' + err.message))
    })
}

// Return final topDecisions object.
// DB = database instance
// JURISDICTION_ID = specific jurisdiction id
exports.topDecisions = function topDecisions(db, jurisdiction_id) {
    if (!db || !jurisdiction_id)
        return (new Object())
    return new Promise(async (resolve) => {
        let topDecisionsObject = new Object();
        let jurisdiction_name = await this.getJurisdictionName(db, jurisdiction_id)
        topDecisionsObject = await this.getDecisionsFromDb(db, jurisdiction_name);
        if (topDecisionsObject)
            resolve(topDecisionsObject);
        else
            resolve(new Object());
    }).catch((err) => {
        reject(new Error('Error in topDecisions(): ' + err.message))
    })
}