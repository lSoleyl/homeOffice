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

  create: function(req, res) {
    res.view() //Force render view... otherwise a new shop is created
  },

  partial_create: function(req, res) {
    res.view("shop/partials/create", {
      layout:""
    })
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

