/**
 * ShopController
 *
 * @description :: Server-side logic for managing Shops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) { //List all shops
    res.view("shop/list") //Just render the view
  },

  view: function(req,res) { //Display a single shop
    if (req.params.id) {
      Shop.find({id: req.params.id}).exec(function (err,shops) {
        if (err)
          return res.serverError(err)

        if (shops.length != 1)
          return res.badRequest("Unknown shop id given")

        var shop = shops[0]
        var viewObj = {
          shop: {
            id: req.params.id,
            name: shop.name
          }
        }
        
        return res.view(viewObj)
      })
    }
  }
};

