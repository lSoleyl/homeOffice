/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name  : { type: 'string' },
    unit  : { type: 'string' },
    shops : {
      collection: 'shop',
      via: 'products'
    },

    prices: {
      collection: 'productentry',
      via: 'product'
    }
  }
};

