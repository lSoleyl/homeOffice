/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) { //List all products
    res.view("product/list") //Just render the view
  },

  view: function(req,res) { //Display a single shop
    if (req.params.id) {
      Product.find({id: req.params.id}).exec(function (err,products) {
        if (err)
          return res.serverError(err)

        if (products.length != 1)
          return res.badRequest("Unknown product id given")

        var product = products[0]
        var viewObj = {
          shop: {
            id: req.params.id,
            name: product.name
          }
        }
        
        return res.view(viewObj)
      })
    }
  }
};

