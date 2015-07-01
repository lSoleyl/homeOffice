/** A service which provides some useful conversion routines
 */


/** Helper function copied form Async repository to implement async.constant and async.asyncify
 */
function _baseSlice(arr, start) {
  start = start || 0;
  var index = -1;
  var length = arr.length;

  if (start) {
    length -= start;
    length = length < 0 ? 0 : length;
  }
  var result = Array(length);

  while (++index < length) {
    result[index] = arr[index + start];
  }
  return result;
}

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
  },

  /** Convert a function which accepts one argument and returns a result into a 
   *  function which asynchronously returns the result by a callback.
   *
   * @param func the function to convert
   */
  toAsync: function(func) {
    return Convert.async.asyncify(func)
  },



  async: {
    //MANUAL Async extension to get the required functionality, which isn't included in async 0.9.3
    /** async.constant copied from https://github.com/caolan/async/blob/master/lib/async.js
     *    - sails doesn't support newer async versions... 
     */
    asyncify: async.asyncify || function(func) {
      return function (/*args..., callback*/) {
        var args = _baseSlice(arguments);
        var callback = args.pop();
        var result;
        try {
          result = func.apply(this, args);
        } catch (e) {
          return process.nextTick(function() { callback(e) })
        }
        process.nextTick(function() { callback(null, result) })
      };
    },


    constant: async.constant || function(/*values...*/) {
      var args = [null].concat(_baseSlice(arguments));
      return function (callback) {
        return callback.apply(this, args);
      };
    }
  }
}