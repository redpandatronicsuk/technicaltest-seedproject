/*
 * File for utility functions. They might be shared between
 * mamny views in a bigger application and having them in a
 * seperate file makes testing clean
 */

/**
 * Returns true is array A and B contain the same elements,
 * otherwise false, based on code found at: https://stackoverflow.com/a/1885569/473453
 * We use set intersection to filter products, e.g only products with the
 * same set of product types as in the selection pass the filter.
 * We could also use functions provided by lodash to accomplish this.
 * 
 * @param {Array} a
 * @param {Array} b
 */
function areTheSameSet(a,b) {
    // First check if the size is the same:
    if (a.length !== b.length) {
        return false
    }
    return a.filter((n) => {
        return b.indexOf(n) !== -1;
    }).length === a.length
}


/**
 * Returns true if the deal has an exact (no less and not more)
 * set of product types and false otherwise.
 * Assumptions:
 * From the text description of the exercise, it appears that for the
 * product type filter we should check against the productTypes property
 * on the deals objects. The filter passes only if the deal has all of
 * the selected product types and no additional ones. Phone is common
 * in all productTypes, so can be ignored.
 * 
 * @param {Object} deal          - A deal object
 * @param {Object} productTypes  - An object where keys with a true
 *                                 value are the productTypes to check against
 */
function doesDealHaveExactProductTypes(deal, productTypes) {
    const arrayOfStringSelections = Object.keys(productTypes).filter(name => productTypes[name])
    // Add phone as it is not part of the selection array
    arrayOfStringSelections.push('Phone')
    return areTheSameSet(arrayOfStringSelections, deal.productTypes)
  }

/**
 * Returns a filtered array of deal objects, only containing
 * deals that contain the specifie product types
 * 
 * @param {Array} deals         - Array of deal objects
 * @param {Object} productTypes - see doesDealHaveExactProductTypes()
 */
function filterDealsByProductTypes(deals, productTypes) {
    return deals.filter(deal => {
        return doesDealHaveExactProductTypes(deal, productTypes)
    })
}

function doesDealHaveExactProductTypesAndSpeed(deal, productTypes, speed) {
    const correctOrIgnoredSpeed = speed ? deal.speed.label === speed : true
    return doesDealHaveExactProductTypes(deal, productTypes) && correctOrIgnoredSpeed    
  }

function filterDealsByProductTypesAndSpeed(deals, productTypes, speed) {
    return deals.filter(deal => {
        return doesDealHaveExactProductTypesAndSpeed(deal, productTypes, speed)
    })
}

export {
    doesDealHaveExactProductTypes,
    filterDealsByProductTypes,
    doesDealHaveExactProductTypesAndSpeed,
    filterDealsByProductTypesAndSpeed
}