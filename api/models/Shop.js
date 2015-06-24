/**
* Shop.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name : { 
      type: 'string',
      unique: true
    },
    
    products : {
      collection: 'productentry',
      via: 'shop'
    },

    //Model methods

    /** This function registers a product to the shop by creating a product entry
     *
     * @param product dbObj or id of the product to register
     * @param entryData an object, which specifies the values to set
     *            - price:int (cents) [required]
     *            - since:date        [optional = new Date()]
     *            - units:float       [optional = 1.0]
     * @param callback the callback which receives the created product entry
     */
    registerProduct: function(product, entryData) {
      var self = this

      return function(callback) {
        entryData = _.defaults(entryData, {'since':new Date(), 'units':1.0 })

        if (!entryData || entryData.price == 0)
          return callback("Product can't be registered without a price!")
        else if (!product)
          return callback("Can't register product(undefined) to a shop!")

        entryData.product = product
        entryData.shop = self

        ProductEntry.create(entryData).exec(callback)
      }
    }, 

    /** Method to retrive the currently valid productentries for a shop.
     *  For this method to work properly, the products field must be populated
     */
    currentPrices: function(callback) {
      var grouped = _.groupBy(this.products, 'product')
      var filtered = _.map(grouped, function(values) { return _.max(values, 'since') })
      process.nextTick(function() { callback(null, filtered) })
    }

  },

  /** Model static function to retrieve the current prices for a shop, which might be only an id.
   */
  currentPrices: function(shop, callback) {
    JSONAPI.Models.resolve(this, shop, {populate:'products'}, function(err, dbShop) {
      if (err)
        return callback(err)

      dbShop.currentPrices(callback)
    })
  },
  
  afterDestroy: function(destroyedRecords, callback) { //This is called whenever a Shop is deleted
    //TODO delete ProductEntries
    callback(null);
  }
};

