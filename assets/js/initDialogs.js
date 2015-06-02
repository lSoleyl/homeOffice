/** This script loads the required locale strings with an ajax request from the server and then
 *  initializes the dialogs.
 */

var localeKeys = [
  "dlg_title_info", 
  "dlg_title_warn", 
  "dlg_title_danger", 
  "dlg_title_success",
  "dlg_btn_ok",
  "dlg_btn_cancel",
  "dlg_btn_confirm"
]

//TODO maybe add a BootstrapDialog.ready() function which triggers all functions when the texts have been initialized

$.ajax('/json/locales', {
  method: 'POST',
  data: JSON.stringify(localeKeys),
  contentType: 'application/json',
  complete: function(data) {
    var t = data.responseJSON

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
  }
})