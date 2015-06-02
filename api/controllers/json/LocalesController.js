/** This file defines a JSON-API for querying a locale string
 */

module.exports = {
  index: function(req, res) { //Lookup a single value
    if (!req.params.id)
      return res.badRequest("missing key to look up")

    return res.json(req.__(req.params.id))
  },

  list: function(req, res) { //Lookup a list of values, which are passed in a request body
    var ids = req.body
    var result = {}

    _.each(ids, function(id) { result[id] = req.__(id) })
    
    res.json(result)
  }
}