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
    Convert.toLocal(sails.controllers['json/person'].index)(req, function(err, people) {
      res.view("purchase/partials/create", { //render the partial
        layout:"", //Don't use layout(scripts etc.), only return partial's HTML
        people: _.map(people, function(x) { return _.omit(x, ['createdAt', 'updatedAt']) })
      })
    })    
  },

  create: function(req, res) { //Overwrite default route, which would create a Purchase object
    Convert.toLocal(sails.controllers['json/person'].index)(req, function(err, people) {
      //Just render the default view and pass the people locale to the view
      res.view({people: _.map(people, function(x) { return _.omit(x, ['createdAt', 'updatedAt']) })})
    })
  }



};

