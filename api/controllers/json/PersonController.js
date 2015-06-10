/** This file defines the JSON-API for the PersonController
 */
module.exports = {
  model: 'Person',

  index: JSONAPI.Controllers.list(),
  
  delete: JSONAPI.Controllers.delete()
}