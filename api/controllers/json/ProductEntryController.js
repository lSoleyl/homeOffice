/** This file defines the JSON-API for the ProductEntryController
 */
module.exports = {
  model:'ProductEntry', //Define Model for JSONAPI


  /** This action will look up all current product entries to a given shop id
   */
  forShop: function(req, res) {
    if (!req.params.id)
      return res.badRequest("Missing shop id")

    var id = parseInt(req.params.id)
    
    Shop.currentPrices(id, function(err, dbEntries) { //Look up current product entries
      if (err)
        return res.serverError("Failed to get the current prices for shop: " + id)

      var entries = _.map(dbEntries, Convert.fromDatabase) //convert product entries to objects
      var productIDs = _.unique(_.map(entries, 'product')) //get product ids
      Product.find(productIDs).exec(function(err, dbProducts) { //look up the referenced products
        var products = _.groupBy(_.map(dbProducts, Convert.fromDatabase), 'id')

        _.each(entries, function(entry) { 
          entry.product = products[entry.product][0]
          entry.product_name = entry.product.name
        })

        res.json(entries)
      })
    })
  }
}