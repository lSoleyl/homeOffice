var AjaxHelper = {
  formatError : function(data) {
    return { 
      status:data.status, 
      statusCode:data.statusCode, 
      statusText:data.statusText,
      getAllResponseHeaders:data.getAllResponseHeaders,
      getResponseHeader:data.getResponseHeader,
      responseText:data.responseText,

      toString: function() {
        return "Error " + this.status + ": " + this.statusText + " (" + this.responseText + ")"
      }
    }
  },

  validMethod: function(method) {
    var methods = ['GET', 'POST', 'PUT', 'DELETE', 'HEAD']
    return _.contains(methods, method)
  }
}


var Ajax = {
  //Shortcut to look up locales
  locales: function(locales, callback) {
    return this.post('/json/locales', locales, callback)
  },

  post:  function(url, params, callback, override) {
    return this.request('POST', url, params, callback, override)
  },

  get:   function(url, params, callback, override) {
    return this.request('GET', url, params, callback, override)
  },

  put:   function(url, params, callback, override) {
    return this.request('PUT', url, params, callback, override)
  },

  delete: function(url, params, callback, override) {
    return this.request('DELETE', url, params, callback, override)
  },


  /** A shorthand function to submit forms via ajax.
   *
   * @param url (optional) - the url to post to... if not set, then it will use the properties ajax-target or target
   * @param form - a jquery wrapped form object
   * @param callback - the callback to call
   */
  form: function(url, form, callback) {
    if (!callback) { //no url provided
      callback = form
      form = url
      url = form.attr('ajax-target') || form.attr('target')
      if (!url)
        throw "No URL has been provided, but <form> has not ajax-target property either"
    }

    //Convert input field data into JSON (name attribute is mandatory for every input element)
    var data = {}
    _.each(form.serializeArray(), function(entry) {
      var input = $(form).find('[name="' + entry.name + '"]')

      var name = input.attr('ajax-name') || entry.name //Allow name overwrite with ajax-name
      data[name] = entry.value
    })

    return Ajax.post(url, data, callback)
  },

  /** this is a generic method to issue an ajax request.
   * 
   * @param method   [default='GET'] the method to use
   * @param url      [required] the url to access
   * @param params   [optional] parameters to pass to the requested API
   * @param callback [optional] a callback of the form function(err,json) which will be called
   *                            on completion
   * @param override [optional] an object to override $.ajax() paramters
   *
   */
  request: function(method, url, params, callback, override) {
    //Parse arguments
    var args = _.filter([method, url, params, callback, override], function(p) { return p !== undefined })
    method = url = params = callback = override = undefined

    if (AjaxHelper.validMethod(args[0]))
      method = args.shift()
    else 
      method = 'GET'

    url = args.shift()

    if (args.length) {
      if (typeof args[0] == "function") {
        callback = args.shift()
        override = args.shift()
      } else {
        params   = args.shift()
        callback = args.shift()
        override = args.shift()

        if (typeof callback == "object") {
          override = callback
          callback = undefined
        }
      }
    }
    //Done parsing arguments


    if (params !== undefined) //Don't stringify for GET requests
      params = (method == 'GET') ? params : JSON.stringify(params)

    var ajaxOptions = {
      method: method,
      data: params,
      contentType: 'application/json'
    }

    //Register callbacks if some was passed to the function
    if (callback) 
      _.assign(ajaxOptions,{
        success: function(json) { return callback(null,json) },
        error:   function(err)  { return callback(AjaxHelper.formatError(err))}
      })

    if (override) 
     _.assign(ajaxOptions, override)
 
    //execute reqeust
    return $.ajax(url, ajaxOptions)
  }
}