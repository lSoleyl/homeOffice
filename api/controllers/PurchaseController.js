/**
 * PurchaseController
 *
 * @description :: Server-side logic for managing Purchases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) { //List all purchases
    res.view("purchase/list") //Just render the view
  }

};

