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


  test: function(req, res) {
    return res.view({time: new Date()})
  }


};

