/** This file defines the JSON-API for the PersonController
 */
module.exports = {
  model: 'Person',

  index: JSONAPI.Controllers.list(),

  create: JSONAPI.Controllers.create({ fields: ['name'] }),
  
  delete: JSONAPI.Controllers.delete()
}