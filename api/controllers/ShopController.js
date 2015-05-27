/**
 * ShopController
 *
 * @description :: Server-side logic for managing Shops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) { //List all shops
    Shop.find().populate('products').exec(function(e,shops) {
      shops.forEach(function (shop) {
        shop.products = shop.products ? shop.products.length : 0
      })
      return res.view("shop/list", shops)
    })
  },


  test: function(req, res) {
    return res.view({time: new Date()})
  }


};

