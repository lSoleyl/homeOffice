/** This file defines the JSON-API for the ShopController
 */
module.exports = {
  model: 'Shop',

  //TODO try to get model by name or somehow require it before...
  index: JSONAPI.Controllers.list({
    queryMapper: JSONAPI.QueryMappers.populate('products'),
    objectMapper: function (shop) { 
      shop.products = shop.products.length
      return shop
    }
  }),

  delete: JSONAPI.Controllers.delete()
}