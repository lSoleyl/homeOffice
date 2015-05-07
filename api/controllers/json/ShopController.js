/** This file defines the JSON-API for the ShopController
 */

module.exports = {
  /* TODO also handle following get parameters: 
   *  - sort=[field]
   *  - order={asc|desc}
   */
  index: function(req, res) { //Return a JSON-List of all shops
    Shop.find().populate('products').exec(function(err,shops) {
      if (err)
        res.serverError(err)


      result = _.map(shops, function (dbShop) {
        var shop = Convert.fromDatabase(dbShop)
        shop.products = shop.products.length
        return shop
      })

      return res.json(result)
    })

  }


}