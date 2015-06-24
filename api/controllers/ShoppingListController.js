/**
 * ShopController
 *
 * @description :: Server-side logic for managing Shops
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) { //List all shops
    res.view("shoppinglist/list") //Just render the view
  },

  create: function(req, res) {
    res.view() //Force render view... otherwise a new shop is created
  }
};

