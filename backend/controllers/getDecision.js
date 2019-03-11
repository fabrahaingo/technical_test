const { dbInit } = require('../models/dbInit')

// Get decision title.
// DECISIONDATA = specific decision Object
function getDecisionTitle(decisionData) {
  return new Promise(async (resolve) => {
    resolve(decisionData.title);
  }).catch((err) => {
    console.log('Error in getTitle(): ' + err.message);
  })
}

// Get decision content.
// DECISIONDATA = specific decision Object
function getDecisionHtmlContent(decisionData) {
  return new Promise(async (resolve) => {
    resolve(decisionData.html_content);
  }).catch((err) => {
    console.log('Error in getHtmlContent(): ' + err.message);
  })
}

// Only one call to db in order to execute other functions faster.
// DB = database instance
// DOC_ID = id of requested decision
function getDecisionDataFromDb(db, doc_id) {
  return new Promise(async (resolve) => {
    const decisionData = await db.get(`
      SELECT title, html_content, solution
      FROM decisions
      WHERE doc_id = ?`
    , [doc_id]).catch((err) => {
        console.log('Error in getDecisionData() SQL request: ' + err.message)
      });
      
      resolve(decisionData)
  }).catch((err) => {
    console.log('Error in getDecisionData(): ' + err.message);
  })
}

module.exports = async function getDecision(req, res) {
  let doc_id = req.query.doc_id;
  let decision = Object.create(null);

  //INSERT YOUR CODE HERE
  const db = await dbInit();
  const decisionData = await getDecisionDataFromDb(db, doc_id);
  if (decisionData)
    decision = {
      title: await getDecisionTitle(decisionData),
      html_content: await getDecisionHtmlContent(decisionData)
    }
  else
    console.log('It seems like the SQL query found nothing')

  return res.json({
    decision
  });
};
