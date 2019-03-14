const { dbInit } = require('../../models/dbInit');
const functions = require('../functions/topDecisions');

// topDecisions()

test('topDecisions() should be defined', async () => {
    expect(await functions.topDecisions())
        .toBeDefined()
})

test('topDecisions() should return Object', async () => {
    const db = await dbInit()
    let jurisdiction_id = 'test'
    expect(typeof await functions.topDecisions(db, jurisdiction_id))
        .toBe("object")
})

// getJurisdictionName()

test('getJurisdictionName() should be defined', async () => {
    expect(await functions.topDecisions())
        .toBeDefined()
})

test('getJurisdictionName() should return String', async () => {
    const db = await dbInit();
    let jurisdiction_id = 'test'
    expect(typeof await functions.getJurisdictionName(db, jurisdiction_id))
        .toBe("string")
})

test('getJurisdictionName(\'JUR359D88F9B71718E7F4A6\') output: "Cour de cassation"', async () => {
    const db = await dbInit();
    let jurisdiction_id = 'JUR359D88F9B71718E7F4A6'
    expect(await functions.getJurisdictionName(db, jurisdiction_id))
        .toBe("Cour de cassation")
})

test('getJurisdictionName(\'JUR64FE952E9CA370DAC630\') output: "Conseil d\'État"', async () => {
    const db = await dbInit();
    let jurisdiction_id = 'JUR64FE952E9CA370DAC630'
    expect(await functions.getJurisdictionName(db, jurisdiction_id))
        .toBe("Conseil d'État")
})

// getDecisionsFromDb()

test('getDecisionsFromDb should be declared', async () => {
    expect(await functions.getDecisionsFromDb())
        .toBeDefined()
})

test('getDecisionsFromDb() should return Object', async () => {
    jest.setTimeout(10000)
    const db = await dbInit();
    let jurisdiction_name = 'test'
    expect(typeof await functions.getDecisionsFromDb(db, jurisdiction_name))
        .toBe("object")
})

test('Output type if missing arguments (should be identical)', async () => {
    const functionReturn = await functions.topDecisions();
    expect(typeof (functionReturn))
        .toBe("object")
    const functionReturn2 = await functions.getJurisdictionName();
    expect(typeof functionReturn2)
        .toBe("string")
    const functionReturn3 = await functions.getDecisionsFromDb();
    expect(typeof functionReturn3)
        .toBe("object")
})