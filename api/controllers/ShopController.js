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
    Convert.toLocal(sails.controllers['json/shop'].view)(req, function(err, shop) {
      if (err) {
        console.error("Error occurred in shop/view:" + err)
        return res.redirect("/shop")
      }
      
      return res.view({shop:shop})
    })
  }
};

