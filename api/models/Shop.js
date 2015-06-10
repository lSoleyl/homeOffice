/**
* Shop.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name : { 
      type: 'string',
      unique: true
    },
    
    products : {
      collection: 'productentry',
      via: 'shop'
    }
  },

  afterDestroy: function(destroyedRecords, callback) { //This is called whenever a Shop is deleted
    //TODO delete ProductEntries
    callback(null);
  }
};

