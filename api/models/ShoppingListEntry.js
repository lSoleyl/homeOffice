/**
* ShoppingListEntry.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    list : {
      model:'shoppinglist',
      via:'entries'
    },

    product : {
      model: 'productentry'
    },

    amount: 'integer'
  }
};

