var Common = {
  Locales: {},


  Button: {
    /** This function returns a generic delete function to be used with delete buttons
     *  
     * @param deleteURL the baseURL to be used for delete eg. "/json/shop/delete" (HTTP DELETE will be used)
     * @param ids an array of ids, or a function returning an array of ids,
     *            which will be posted as request body to the server.
     * @param table_redirecturl either a bootstrap table to refresh, or a redirect-url to redirect to
     */
    delete:function(deleteURL, ids, table_redirecturl) {
      var t = Common.Locales

      return function() {
        var delete_ids = (typeof ids == "function") ? ids() : ids

        BootstrapDialog.confirm(t['dlg_delete?'], function(confirmed) {
          if (confirmed) {
            Ajax.delete(deleteURL, delete_ids, function(err, res) {
              if (err) {
                console.error("" + err)
                return BootstrapDialog.error(t['dlg_deletion_failed'])
              }

              BootstrapDialog.success(res.affectedRecords + " " + t['dlg_deleted_entries'], function() {
                if (table_redirecturl && typeof table_redirecturl == "string") //A redirect url
                  document.location.href = table_redirecturl
              })

              if (table_redirecturl && typeof table_redirecturl != "string") //A table
                table_redirecturl.bootstrapTable('refresh')
            })
          }
        })
      }
    }
  },

  Select: {
    /** This function implements option caching for a <select> element via localStorage
     *
     * @param element the jQuery element to apply this to
     * @param key_name the key to store this value at
     */
    local_cache: function(element, key_name) {
      if (localStorage.getItem(key_name)) { //Do we have a stored selection?
        var initialValue = element.val()
        element.val(localStorage.getItem(key_name)) //set stored value
        if (!element.val()) //stored selection is invalid, restore to previous state
          element.val(initialValue)
      }

      //Register all changes
      $('#input_paid_by').change(function(event) { localStorage.setItem(key_name, $(this).val()) })
    }
  }
};

//Initializer
(function() {
  var locales = [
    'dlg_delete?',
    'dlg_deletion_failed',
    'dlg_deleted_entries'
  ]

  Ajax.locales(locales, function(err, resolved_locales) {
    if (err) {
      console.error("Locale initialization failed!")
      return console.error(err)
    }

    _.assign(Common.Locales,resolved_locales)
  })
})()