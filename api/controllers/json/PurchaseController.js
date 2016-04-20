/** This file defines the JSON-API for the PersonController
 */
module.exports = {
  model: 'Purchase',

  index: JSONAPI.Controllers.list(),
  
  delete: JSONAPI.Controllers.delete()
}