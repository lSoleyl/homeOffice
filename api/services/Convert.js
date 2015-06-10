/** A service which provides some useful conversion routines
 */

module.exports = {
  
  /** This method converts a database object wrapper into a plain java script object
   *  by using the JSON string format. This makes the object modifyable again.
   *
   * @param dbObject an object which was retrieved from a database
   *
   * @return a normal JS-Object
   */
  fromDatabase: function(dbObject) {
    return JSON.parse(JSON.stringify(dbObject))
  },

  /** Pass this method a function(req,res){} and it will return a function(function(err,data)) {}
   *  All data which the requestHandler needs from the req-object must be passed as parameter 
   *  to the returned function.
   *  All error calls (res.serverError(), res.badRequest() will be returned as error)
   *
   * @param requestHandler the function to convert
   * 
   * @return a function of the signature function(req, function(err,data))
   *         the function can also be called with just the callback.
   */
  toLocal: function(requestHandler) {
    return function(req, callback) {
      if (!callback) {
        callback = req
        req = undefined
      }

      var res = { //Mock response object
        serverError: function(err)  { return callback(err) },
        badRequest:  function(err)  { return callback(err) },
        json:        function(data) { return callback(null, data) }
      }

      return requestHandler(req, res)
    }
  }
}