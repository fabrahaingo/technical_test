const { dbInit } = require('../../models/dbInit');
const functions = require('../functions/jurisdictionContactInfos');

test('Is defined : addVerifiedValue()', async () => {
    expect(await functions.addVerifiedValue()).toBeDefined()
})

test('Is defined : isEmpty()', async () => {
    expect(await functions.isEmpty()).toBeDefined()
})

test('Is defined : needVerifiedValue()', async () => {
    expect(await functions.needVerifiedValue()).toBeDefined()
})

test('Is defined : getVerifiedInfo()', async () => {
    expect(await functions.getVerifiedInfo()).toBeDefined()
})

test('Is defined : valuesToArray()', async () => {
    expect(await functions.valuesToArray()).toBeDefined()
})

test('Output type Array : addVerifiedValue()', async () => {
    let resultArray = new Array()
    let i = new Number()
    let verifiedInfo = new Object()
    expect(Array.isArray(await functions.addVerifiedValue(resultArray, i, verifiedInfo))).toBe(true)
})

test('Output type Boolean : isEmpty()', async () => {
    let obj = new Object()
    expect(typeof (await functions.isEmpty(obj))).toBe('boolean')
})

test('Output type Boolean : needVerifiedValue()', async () => {
    let verifiedInfo = { value: 'test' }
    let value = 'test'
    let valueArray = [ test = 'test']
    expect(typeof (await functions.needVerifiedValue(verifiedInfo, value, valueArray))).toBe('boolean')
})