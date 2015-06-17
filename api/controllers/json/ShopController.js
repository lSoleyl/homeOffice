/** This file defines the JSON-API for the ShopController
 */
module.exports = {
  model: 'Shop',

  index: JSONAPI.Controllers.list({
    queryMapper: JSONAPI.QueryMappers.populate('products'),
    objectMapper: function (shop) { 
      shop.products = shop.products.length
      return shop
    }
  }),


  create: JSONAPI.Controllers.create({
    fields: ["name"]
  }),

  delete: JSONAPI.Controllers.delete()
}