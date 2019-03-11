const { dbInit } = require('../models/dbInit');

// Add verified value if not added before.
// RESULTARRAY = unverified information
// I = index in the array
// VERIFIEDINFO = verified information
function addVerifiedValue(resultArray, i, verifiedInfo) {
  return new Promise(async (resolve) => {
    verifiedInfo['verified'] = true;
    resultArray[i] = verifiedInfo;
    resolve();
  }).catch((err) => {
    console.log('Error in addVerifiedValue(): ' + err.message);
  })
}

// Check if object is empty.
// OBJ = Object to check
function isEmpty(obj) {
  return new Promise((resolve) => {
    for(var key in obj) {
      if(obj.hasOwnProperty(key))
        resolve(false);
    }
    resolve(true);
  }).catch((err) => {
    console.log('Error in isEmpty(): ' + err.message);
  })
}

// Add verified value (first try).
// => Returns true if a verified value is not in unverified array.
function needVerifiedValue(verifiedInfo, value, valueObject) {
  return new Promise(async (resolve) => {
    if (verifiedInfo) {
      if (verifiedInfo.data === value) {
        valueObject['verified'] = true;
      }
      else if (value) {
        valueObject['verified'] = false;
      }
      else {
        resolve(true);
      }
    }
    else if (value) {
      valueObject['verified'] = false;
    }
    resolve(false);
  }).catch((err) => {
    console.log('Error in isVerifiedValue(): ' + err.message);
  });
}

// Get verified info from database.
function getVerifiedInfo(db, key, jurisdiction_id) {
  return new Promise(async (resolve) => {
    const verifiedInfo = await db.get(`
      SELECT data
      FROM jurisdictions_verified_contact_infos
      WHERE jurisdiction_id = ?
      AND type = ?`
    , [jurisdiction_id, key]).catch((err) => {
      console.log('Error in isVerifiedValue() SQL request: ' + err.message);
    });
    resolve(verifiedInfo);
  }).catch((err) => {
    console.log('Error in getVerifiedInfo(): ', err.message);
  })
}

// Create an array of objects (data + verified).
function valuesToArray(obj, db, jurisdiction_id) {
  return new Promise(async (resolve) => {
    let resultArray = new Array();
    let valueObject = new Object();
    let i = 0;
    Object.entries(obj).forEach(async (elem) => {
      if (elem[i] && elem[i + 1]) {
        valueObject = {
          data: elem[i + 1]
        }
      }
      let verifiedInfo = await getVerifiedInfo(db, elem[i], jurisdiction_id);
      if (await needVerifiedValue(verifiedInfo, elem[i + 1], valueObject)) {
        addVerifiedValue(resultArray, i, verifiedInfo);
        i++;
      }
      if (valueObject && !await isEmpty(valueObject)) {
        resultArray[i] = valueObject;
        i++;
      }
    });
    resolve(resultArray);
  }).catch((err) => {
    console.log('Error in valuesToArray(): ' + err.message);
  });
}

// Fill value array (ex: if info has many values) + get unverified info from database.
function createValueArray(key, db, jurisdiction_id) {
  return new Promise(async resolve => {
    const valueObject = await db.get(`
      SELECT ` + (key) +
      ` FROM jurisdictions
      WHERE jurisdiction_id = ?`
    , [jurisdiction_id]).catch((err) => {
      console.log('Error in createValueArray() SQL request: ' + err.message)
    });
    resolve(await valuesToArray(valueObject, db, jurisdiction_id));
  }).catch((err) => {
    console.log('Error in createValueArray(): ' + err.message);
  });
}

// Fill jurisdiction_contact_infos object.
function createVerifiedContactObject(db, contact_infos, jurisdiction_id) {
  return new Promise(async (resolve) => {
    contact_infos = {
      telephone: await createValueArray('telephone', db, jurisdiction_id),
      email: await createValueArray('email', db, jurisdiction_id),
      fax: await createValueArray('fax', db, jurisdiction_id)
    }
    resolve(contact_infos);
  }).catch((err) => {
    console.log('Error in createVerifiedContactObject(): ' + err.message);
  })
}

module.exports = async function getJurisdictionContactInfos(req, res) {
  let jurisdiction_id = req.query.jurisdiction_id;
  let jurisdiction_contact_infos = Object.create(null);

  //INSERT YOUR CODE HERE
  const db = await dbInit();
  jurisdiction_contact_infos = await createVerifiedContactObject(db, jurisdiction_contact_infos, jurisdiction_id);

  return res.json({
    jurisdiction_contact_infos
  });
};
