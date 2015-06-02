/** 
 * A service providing debug functionality
 */
module.exports = {
  callback: function(err,data) { 
    if (err)
      console.error(err)
    else
      console.log(data)
  }
}