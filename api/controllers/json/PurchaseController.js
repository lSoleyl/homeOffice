/** This file defines the JSON-API for the PersonController
 */
module.exports = {
  model: 'Purchase',

  index: JSONAPI.Controllers.list({ 
    queryMapper: JSONAPI.QueryMappers.populate('paidBy'),
    objectMapper: function(purchase) {
      purchase.paidBy = {
        text: purchase.paidBy.name,
        href: "/person/view/" + purchase.paidBy.id
      }
      return purchase
    }
   }),

  create: JSONAPI.Controllers.create({
    fields: ['price', 'date', 'paidBy', 'description'],
    optional: ['description']
  }),
  
  delete: JSONAPI.Controllers.delete()
}