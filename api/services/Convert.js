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
  }
}