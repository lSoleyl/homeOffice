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
    unit  : { 
      type: 'string',
      required: true
    },

    prices: {
      collection: 'productentry',
      via: 'product'
    },


    /** Method to retrive the currently valid productentries for a product.
     *  For this method to work properly, the prices field must be populated
     */
    currentPrices: function(callback) {
      var grouped = _.groupBy(this.prices, 'shop')
      var filtered = _.map(grouped, function(values) { return _.max(values, 'since') })
      process.nextTick(function() { callback(null, filtered) })
    }

  },

  /** Model static function to retrieve the current prices for a product, which might be only an id.
   */
  currentPrices: function(product, callback) {
    JSONAPI.Models.resolve(this, product, {populate:'prices'}, function(err, dbProduct) {
      if (err)
        return callback(err)

      dbProduct.currentPrices(callback)
    })
  }
};

