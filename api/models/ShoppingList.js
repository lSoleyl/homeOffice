/**
* ShoppingList.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    
    date : 'date', 

    shop: { 
      model:'shop',
      required:true 
    },

    entries : {
      collection: 'shoppinglistentry',
      via: 'list'
    },

    paidBy: { model:'person' },

    //Model methods

    /** Add products to the given list.
     *    
     * @param entries a list of product entry stubs: [ { product:int, amount:int }, ... ]
     */
    addProducts: function(entries, callback) {
      Shop.currentPrices(this.shop, function(err, currentEntries) {
        if (err)
          return callback(err)

        _.each(entries, function(entry) {
          var productEntry = _.find(currentEntries, function (x) { return x.product == entry.id })
          list.entries.add(productEntry)
        })

        this.save()
      })
    }

  }    
};

