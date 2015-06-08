/** This file defines the JSON-API for the ShopController
 */
module.exports = {
  index: function(req, res) { //Return a JSON-List of all shops
    Shop.find().populate('products').exec(function(err,shops) {
      if (err)
        res.serverError(err)


      result = _.map(shops, function (dbShop) {
        var shop = Convert.fromDatabase(dbShop)
        shop.products = shop.products.length
        return shop
      })

      return res.json(result)
    })

  },

  //FIXME error that json can't be parsed, when just a number is passed in the request body
  delete: function(req, res) { //Deletes the given shops
    var ids = (_.isNumber(req.body)) ? [ req.body ] : req.body


    if (!ids || ! _.all(ids, _.isNumber)) //Validate id array (to prevent someone from entering criteria objects)
      return res.badRequest("Expected list of ids to delete")

    if (!ids.length || ids.length == 0)
      return res.badRequest("Expected not empty list of ids to delete")

    Shop.destroy(ids).exec(function(err, records) {
      if (err) {
        console.error("Couldn't delete " + JSON.stringify(ids))
        console.error(err)
        return res.serverError("Couldn't delete entries")
      }

      return res.json({ affectedRecords:records.length })
    })
  }
}