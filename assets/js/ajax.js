var AjaxFormatter = {
  formatError : function(data) {
    return { 
      status:data.status, 
      statusCode:data.statusCode, 
      statusText:data.statusText,
      getAllResponseHeaders:data.getAllResponseHeaders,
      getResponseHeader:data.getResponseHeader,

      toString: function() {
        return "Error " + this.status + ": " + this.statusText
      }
    }
  }
}


var Ajax = {
  post: function(url,params,callback) {
    var Ajax = this

    $.ajax(url, {
      method: 'POST',
      data: JSON.stringify(params),
      contentType: 'application/json',
      
      success: function(json) {
        callback(null,json)
      },

      error: function(err) {
        callback(AjaxFormatter.formatError(err))
      }
    })
  }


  //TODO get function
}