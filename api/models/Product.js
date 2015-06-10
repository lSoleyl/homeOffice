/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name  : { 
      type: 'string',
      unique: true
    },
    unit  : { type: 'string' },
    shops : {
      collection: 'shop',
      via: 'products'
    },

    prices: {
      collection: 'productentry',
      via: 'product'
    }
  },

  /** This function extracts the current prices
   */
  currentPrices: function(product) {
    var grouped = _.groupBy(product.prices, function(entry) { return entry.shop })

    product.prices = _.map(grouped, function(entries, shop) {
      return _.max(entries, function(x) { return x.since })
    })

    return product
  }
};

