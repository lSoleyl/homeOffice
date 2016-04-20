/**
* Purchase.js
*
* @description :: This model class represents a shopping transaction, having a price and a person who paid it
*                 Additionally this model has an optional description
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    price: { type: 'integer', required:true }, //in cents
    paidBy: { model:'person', required:true },
    description: { type: 'string', required:false },
    date: { type:'date', required:true }
  }
};

