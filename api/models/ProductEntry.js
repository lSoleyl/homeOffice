/**
* ProductEntry.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {
  attributes: {

    product : { model: 'product' },
    shop:     { model: 'shop'    },
    price :   { type:  'integer' },
    since:    { type:  'date'    }
  }
};

