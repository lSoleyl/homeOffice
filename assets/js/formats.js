/** This script contains various commonly used formatting functions for 
 *  bootstrap tables (used in attribute: data-formatter="...")
 *
 */
var Formats = {
  //This function displays a euro price with a euro sign
  price: function(value) {
    return "<div>" + value + " &euro;</div>"
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