/** This script loads the required locale strings with an ajax request from the server and then
 *  initializes the dialogs.
 */

var localeKeys = [
  "dlg_title_info", 
  "dlg_title_warn", 
  "dlg_title_danger", 
  "dlg_title_success",
  "dlg_title_error",
  "dlg_title_formular",
  "dlg_btn_ok",
  "dlg_btn_cancel",
  "dlg_btn_confirm",
  "dlg_creation_failed",
  "dlg_creation_success"
]

//TODO maybe add a BootstrapDialog.ready() function which triggers all functions when the texts have been initialized
Ajax.locales(localeKeys, function(err, t) {
  if (err)
    return console.err("Failed to initialize Bootstrap dialogs!")

  //Set titles
  BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DEFAULT] = ""
  BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_INFO] = t["dlg_title_info"]
  BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_SUCCESS] = t["dlg_title_success"]
  BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_WARNING] = t["dlg_title_warn"]
  BootstrapDialog.DEFAULT_TEXTS[BootstrapDialog.TYPE_DANGER] = t["dlg_title_danger"]

  //Set buttons
  BootstrapDialog.DEFAULT_TEXTS['OK'] = t["dlg_btn_ok"]
  BootstrapDialog.DEFAULT_TEXTS['CANCEL'] = t["dlg_btn_cancel"]
  BootstrapDialog.DEFAULT_TEXTS['CONFIRM'] = t["dlg_btn_confirm"]

  //Define timeouts
  BootstrapDialog.DEFAULT_TIMEOUTS = {}
  BootstrapDialog.DEFAULT_TIMEOUTS[BootstrapDialog.TYPE_INFO   ] = 2000
  BootstrapDialog.DEFAULT_TIMEOUTS[BootstrapDialog.TYPE_SUCCESS] = 2000
  //All other types don't have timeouts set (for now)

  BootstrapDialog.BUTTONS = {}
  BootstrapDialog.BUTTONS.OK =      { label: BootstrapDialog.DEFAULT_TEXTS.OK,      action:function(dialog) { dialog.close() }}
  BootstrapDialog.BUTTONS.CANCEL  = { label: BootstrapDialog.DEFAULT_TEXTS.CANCEL,  action:function(dialog) { dialog.close() }}
  BootstrapDialog.BUTTONS.CONFIRM = { label: BootstrapDialog.DEFAULT_TEXTS.CONFIRM, action:function(dialog) { dialog.confirmed = true; dialog.close() }}

  //Generic function to generate 
  //Callback automatically gets bound to the dialog
  function genericDialog(type, text, cb, timeout) {
    timeout = (timeout === undefined) ? BootstrapDialog.DEFAULT_TIMEOUTS[type] : timeout

    if (cb && typeof cb != "function")
      return console.error("Expected a callback, but got: " + cb)

    var dlgObj = {
      type: type,
      closable: true,
      message: text
    }

    //extend dialog with timeout and callback
    if (cb) dlgObj.onhidden = function(dialog) { cb.bind(dialog)(!!dialog.confirmed) }
    if (timeout) dlgObj.onshown = function(dialog) { setTimeout(function() { dialog.close() }, timeout) }

    return dlgObj
  }


  //Custom dialog functions
  BootstrapDialog.error = function(text, cb, timeout) {
    var dialog = genericDialog(BootstrapDialog.TYPE_DANGER, text, cb, timeout)
    dialog.title = t["dlg_title_error"]
    dialog.buttons = [ BootstrapDialog.BUTTONS.OK ]
    return BootstrapDialog.show(dialog)
  }

  //A dialog which is automatically closing
  BootstrapDialog.info = function(text, cb, timeout) {
    var dialog = genericDialog(BootstrapDialog.TYPE_INFO, text, cb, timeout)
    return BootstrapDialog.show(dialog)
  }

  BootstrapDialog.success = function(text, cb, timeout) {
    var dialog = genericDialog(BootstrapDialog.TYPE_SUCCESS, text, cb, timeout)
    return BootstrapDialog.show(dialog)
  }

  BootstrapDialog.confirm = function(text, cb, timeout) {
    var dialog = genericDialog(BootstrapDialog.TYPE_WARNING, text, cb, timeout)
    dialog.buttons = [ BootstrapDialog.BUTTONS.CANCEL, BootstrapDialog.BUTTONS.CONFIRM ]
    return BootstrapDialog.show(dialog)
  }

  BootstrapDialog.form = function(url, cb) {
    cb = cb || function() {}
    
    //Load document / not using Ajax.get, because we need HTML
    $("<div></div>").load(url, function(html) {
      var title = $(this).find("h2").text() || t["dlg_title_formular"] //extract dialog title
      var message = $("<div></div>").html(html)
      message.find("h2").remove() //Remove heading from dialog body

      var dialog = genericDialog(BootstrapDialog.TYPE_DEFAULT, message)
      dialog.title = title

      dialog.onshown = undefined

      dialog.onshow = function(dlg) { //Modify dom, before dialog is completely shown
        var form = dlg.getMessage().find("form")
        form.find(".btn-primary").click(function() { //Add click-action to button
          dlg.close()

          Ajax.form(form, cb)
        })
      }

      return BootstrapDialog.show(dialog)
    }) 
  }

  BootstrapDialog.createForm = function(url, cb) {
    cb = cb || function() {}

    return BootstrapDialog.form(url, function(err,data) {
      if (err) {
        console.error("Entry creation failed:")
        console.error(err)
        return BootstrapDialog.error(t["dlg_creation_failed"], function() { cb(err) })
      }

      BootstrapDialog.success(t["dlg_creation_success"], function() { cb(null, data) })
    })
  }
  
})