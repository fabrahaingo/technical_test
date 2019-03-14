// Add verified value if not added before.
// RESULTARRAY = unverified information
// I = index in the array
// VERIFIEDINFO = verified information
exports.addVerifiedValue = function addVerifiedValue(resultArray, i, verifiedInfo) {
    if (!resultArray || !i || !verifiedInfo)
            return(new Array())
    return new Promise(async (resolve) => {
        verifiedInfo['verified'] = true;
        resultArray[i] = verifiedInfo;
        resolve(resultArray);
    }).catch((err) => {
        console.log('Error in addVerifiedValue(): ' + err.message);
    })
}

// Check if object is empty.
// OBJ = Object to check
exports.isEmpty = function isEmpty(obj) {
    if (!obj)
        return(new Boolean())
    return new Promise((resolve) => {
        for (var key in obj) {
            if (obj.hasOwnProperty(key))
                resolve(false);
        }
        resolve(true);
    }).catch((err) => {
        console.log('Error in isEmpty(): ' + err.message);
    })
}

// Add verified value (first try).
// => Returns true if a verified value is not in unverified array.
exports.needVerifiedValue = function needVerifiedValue(verifiedInfo, value, valueArray) {
    if (!verifiedInfo || !value || !valueArray)
        return(new Boolean().valueOf())
    return new Promise(async (resolve) => {
        if (verifiedInfo) {
            if (verifiedInfo.data === value) {
                valueArray['verified'] = true;
            } else if (value) {
                valueArray['verified'] = false;
            } else {
                resolve(true);
            }
        } else if (value) {
            valueArray['verified'] = false;
        }
        resolve(false);
    }).catch((err) => {
        console.log('Error in isVerifiedValue(): ' + err.message);
    });
}

// Get verified info from database.
exports.getVerifiedInfo = function getVerifiedInfo(db, key, jurisdiction_id) {
    if (!db || !key || !jurisdiction_id)
        return (new Object())
    return new Promise(async (resolve, reject) => {
        const verifiedInfo = await db.get(`
        SELECT data
        FROM jurisdictions_verified_contact_infos
        WHERE jurisdiction_id = ?
        AND type = ?`, [jurisdiction_id, key]).catch((err) => {
            console.log('Error in isVerifiedValue() SQL request: ' + err.message);
        });
        if (verifiedInfo)
            resolve(verifiedInfo)
        else
            resolve(new Object())
    }).catch((err) => {
        console.log('Error in getVerifiedInfo(): ', err.message);
    })
}

// Create an array of objects (data + verified).
exports.valuesToArray = function valuesToArray(obj, db, jurisdiction_id) {
    if (!obj || !db || !jurisdiction_id)
        return (new Array())
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
            let verifiedInfo = await this.getVerifiedInfo(db, elem[i], jurisdiction_id);
            if (await this.needVerifiedValue(verifiedInfo, elem[i + 1], valueObject)) {
                this.addVerifiedValue(resultArray, i, verifiedInfo);
                i++;
            }
            if (valueObject && !await this.isEmpty(valueObject)) {
                resultArray[i] = valueObject;
                i++;
            }
        });
        if (resultArray)
            resolve(resultArray)
        else
            resolve(new Array())
    }).catch((err) => {
        console.log('Error in valuesToArray(): ' + err.message);
    });
}

// Fill value array (ex: if info has many values) + get unverified info from database.
exports.createValueArray = function createValueArray(key, db, jurisdiction_id) {
    return new Promise(async resolve => {
        const valueObject = await db.get(`
        SELECT ` + (key) +
            ` FROM jurisdictions
        WHERE jurisdiction_id = ?`, [jurisdiction_id]).catch((err) => {
            console.log('Error in createValueArray() SQL request: ' + err.message)
        });
        resolve(await this.valuesToArray(valueObject, db, jurisdiction_id));
    }).catch((err) => {
        console.log('Error in createValueArray(): ' + err.message);
    });
}

// Fill jurisdiction_contact_infos object.
exports.createVerifiedContactObject = function createVerifiedContactObject(db, contact_infos, jurisdiction_id) {
    return new Promise(async (resolve) => {
        contact_infos = {
            telephone: await this.createValueArray('telephone', db, jurisdiction_id),
            email: await this.createValueArray('email', db, jurisdiction_id),
            fax: await this.createValueArray('fax', db, jurisdiction_id)
        }
        resolve(contact_infos);
    }).catch((err) => {
        console.log('Error in createVerifiedContactObject(): ' + err.message);
    })
}