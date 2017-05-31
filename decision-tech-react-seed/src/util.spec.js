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

// Tests for function doesDealHaveExactProductTypes
describe('doesDealHaveExactProductTypes Single Selected Value Positive', () => {
  it('should return true as the deal has only the specified product type', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Broadband: true})).toBe(true)
  })
})

describe('doesDealHaveExactProductTypes Single Selected Value Negative', () => {
  it('should return false as the deal does not have the specified product type', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Mobile: true})).toBe(false)
  })
})

describe('doesDealHaveExactProductTypes No Value Negative', () => {
  it('should return false as no product types are selected', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Broadband: false})).toBe(false)
  })
})

describe('doesDealHaveExactProductTypes Multiple Values Negative', () => {
  it('should return false as the deal does not have all selected product types', () => {
    expect(doesDealHaveExactProductTypes(deals[0], {Broadband: true, Mobile: true})).toBe(false)
  })
})

describe('doesDealHaveExactProductTypes Multiple Values Positive', () => {
  it('should return true as the deal has all of the selected product types', () => {
    expect(doesDealHaveExactProductTypes(deals[1], {Broadband: true, TV: true})).toBe(true)
  })
})



// describe('doesDealHaveExactProductTypes Single Value Negative', () => {
//   it('should return false as the deal does not have the specified product type', () => {
//     expect(doesDealHaveExactProductTypes(deals[0], {TV: true})).toBe(false)
//   })
// })

// describe('doesDealHaveExactProductTypes Multiple Values Positive', () => {
//   it('should return true as the deal has at least one of the specified product types', () => {
//     expect(doesDealHaveExactProductTypes(deals[0], {Broadband: true, TV: true})).toBe(true)
//   })
// })

// describe('doesDealHaveExactProductTypes Multiple Values Negative', () => {
//   it('should return false as the deal has none of the specified product types', () => {
//     expect(doesDealHaveExactProductTypes(deals[0], {Gas: true, TV: true})).toBe(false)
//   })
// })


//Tests for function filterDealsByProductTypesAndSpeed
describe('filterDealsByProductTypesAndSpeed filtering by Broadband', () => {
  it('should return 3 deals', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: false, Mobile: false}).length).toBe(3)
  })
})

describe('filterDealsByProductTypesAndSpeed filtering by Broadband & TV ', () => {
  it('should return 2 deals', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: true, Mobile: false}).length).toBe(2)
  })
})

describe('filterDealsByProductTypesAndSpeed filtering by Broadband & Mobile ', () => {
  it('should return 1 deal', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: false, Mobile: true}).length).toBe(1)
  })
})

describe('filterDealsByProductTypesAndSpeed filtering by Broadband & Mobile & TV + Speed=5MB', () => {
  it('should return 0 deals', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: true, Mobile: true}, '5').length).toBe(0)
  })
})

describe('filterDealsByProductTypesAndSpeed filtering by Broadband & Mobile & TV + Speed=52MB', () => {
  it('should return 0 deals', () => {
    expect(filterDealsByProductTypesAndSpeed(deals, {Broadband: true, TV: true, Mobile: true}, '52').length).toBe(1)
  })
})


// New test with added speed:
describe('doesDealHaveExactProductTypesAndSpeed Single Selected Value Positive', () => {
  it('should return true as the deal has only the specified product type and speed', () => {
    expect(doesDealHaveExactProductTypesAndSpeed(deals[0], {Broadband: true}, '17')).toBe(true)
  })
})

describe('doesDealHaveExactProductTypesAndSpeed Single Selected Value Negative', () => {
  it('should return false as the deal has only the specified product type, but different speed', () => {
    expect(doesDealHaveExactProductTypesAndSpeed(deals[0], {Broadband: true}, '52')).toBe(false)
  })
})

describe('doesDealHaveExactProductTypesAndSpeed Single Selected Value Positive', () => {
  it('should return true as the deal has only the specified product type and speed is ignored', () => {
    expect(doesDealHaveExactProductTypesAndSpeed(deals[0], {Broadband: true})).toBe(true)
  })
})
