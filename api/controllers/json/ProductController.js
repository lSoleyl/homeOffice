/** This file defines the JSON-API for the ProductController
 */
module.exports = {
  model:'Product', //Define Model for JSONAPI

  //TODO make model in declaration available!
  index: JSONAPI.Controllers.list({
    queryMapper: JSONAPI.QueryMappers.populate('prices'),
    objectMapper: function(product) { return Product.currentPrices(product) } 
  }),

  delete: JSONAPI.Controllers.delete()
}