import { doesDealHaveExactProductTypes, filterDealsByProductTypesAndSpeed, doesDealHaveExactProductTypesAndSpeed } from './util'

// Resuing same deals data as in real app. If this
// data is dynamic, we should use a static deals
// object to test against:
const deals = require('./assets/deals').deals

/* productTypes in deals array:
0: ["Broadband", "Phone"]
1: ["TV", "Phone", "Broadband"]
3: ["TV", "Phone", "Broadband"]
4: ["TV", "Phone", "Broadband", "Mobile"]
5: ["Broadband", "Phone", "Mobile"]
6: ["Broadband", "Phone"]
7: ["Broadband", "Phone"]
*/

// Tests for function which checks if a single deal has
// the exact specified product types:
describe('doesDealHaveExactProductTypes', () => {
  it('should return true as the deal has only the specified product type', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Broadband: true})).toBe(true)
  })
  it('should return false as the deal does not have the specified product type', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Mobile: true})).toBe(false)
  })
  it('should return false as no product types are selected', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Broadband: false})).toBe(false)
  })
  it('should return false as the deal does not have all selected product types', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Broadband: true, Mobile: true})).toBe(false)
  })
  it('should return true as the deal has all of the selected product types', () => {
    expect(doesDealHaveExactProductTypes(deals[1], {Broadband: true, TV: true})).toBe(true)
  })
})

// Similar to above but with added speed:
describe('doesDealHaveExactProductTypesAndSpeed', () => {
  it('should return true as the deal has only the specified product type and speed', () => {
    expect(doesDealHaveExactProductTypesAndSpeed(deals[0], {Broadband: true}, '17')).toBe(true)
  })
  it('should return false as the deal has only the specified product type, but different speed', () => {
    expect(doesDealHaveExactProductTypesAndSpeed(deals[0], {Broadband: true}, '52')).toBe(false)
  })
  it('should return true as the deal has only the specified product type and speed is ignored', () => {
    expect(doesDealHaveExactProductTypesAndSpeed(deals[0], {Broadband: true})).toBe(true)
  })
})

// Test for function which only returns deals from an array
// of deals that pass the selection criteria:
describe('filterDealsByProductTypesAndSpeed', () => {
  it('filtering by Broadband should return 3 deals', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: false, Mobile: false}).length).toBe(3)
  })
  it('filtering by Broadband & TV should return 2 deals', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: true, Mobile: false}).length).toBe(2)
  })
  it('filtering by Broadband & Mobile should return 1 deal', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: false, Mobile: true}).length).toBe(1)
  })
  it('filtering by Broadband & Mobile & TV + Speed=5MB should return 0 deals', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: true, Mobile: true}, '5').length).toBe(0)
  })
  it('filtering by Broadband & Mobile & TV + Speed=52MB should return 1 deal', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: true, Mobile: true}, '52').length).toBe(1)
  })
})
