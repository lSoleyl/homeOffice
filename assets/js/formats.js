/** This script contains various commonly used formatting functions for 
 *  bootstrap tables (used in attribute: data-formatter="...")
 *
 */
var Formats = {
  //This function converts a cent price into a euro price
  price: function(value) {
    var cents = "" + (value % 100)
    while (cents.length < 2)
      cents += "0"

    return "<div>" + Math.floor(value / 100) + "," + cents + " &euro;</div>"
  },

  //This function returns a function, which selects a certain property from an object
  //this is currently not working with the data-formatter attribute
  property: function(propName) {
    return function(value) {
      return "<div>" + value[propName] + "</div>"
    }
  },

  /** This formatter expects an object with the attributes "text" and "href" and generates a
   */
  link: function(object) {
    return "<div><a href=\"" + object.href + "\">" + object.text + "</a></div>"
  },

  date: function(date) {
    return "<div>" + (new Date(date)).toLocaleDateString() + "</div>"
  },

  inspect: function(value) {
    return "<div>" + JSON.stringify(value) + "</div>"
  }
}