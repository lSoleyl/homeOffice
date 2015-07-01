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

  view: function(req,res) { //Display a single product
    Convert.toLocal(sails.controllers['json/product'].view)(req, function(err, product) {
      if (err) {
        console.error("Error occurred in product/view:" + err)
        return res.redirect("/product")
      }
      
      return res.view({product:product})
    })
  }
};

