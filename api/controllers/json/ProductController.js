/** This file defines the JSON-API for the ProductController
 */
module.exports = {
  model:'Product', //Define Model for JSONAPI

  index: JSONAPI.Controllers.list({
    queryMapper: JSONAPI.QueryMappers.populate('prices'),
    adbMapper: function(product, callback) { 
      return product.currentPrices(function(err, prices) {
        var resObj = Convert.fromDatabase(product)
        product.prices = prices
        return callback(null, product)
      })
    } 
  }),

  //TODO populate price and shop data in view
  view: JSONAPI.Controllers.view(),

  delete: JSONAPI.Controllers.delete()
}