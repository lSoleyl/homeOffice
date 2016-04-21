/**
 * PurchaseController
 *
 * @description :: Server-side logic for managing Purchases
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	index: function(req, res) { //List all purchases
    res.view("purchase/list") //Just render the view
  },

  //Used to display creation form inside a BootstrapDialog
  partial_create: function(req, res) {
    res.view("purchase/partials/create", { //render the partial
      layout:"" //Don't use layout(scripts etc.), only return partial's HTML
    })
  },

  create: function(req, res) { //Overwrite default route, which would create a Purchase object
    res.view() //Just render the view (with layout)
  }



};

