/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */
module.exports.bootstrap = function(cb) {


  if (sails.config.environment == 'development') { //clear database and populate it with default values
    var models = [Shop, Product, ProductEntry, Person, ShoppingList, ShoppingListEntry]

    console.log("Clearing database for development environment...")
    async.each(models, 
      function(model, callback) { model.destroy({}).exec(callback)}, 
      function(err) {
        if (err)
          return cb(err)

        console.log("Populating database with test values...")

        var people = [{name:'John'}, {name:'Yuno'}]

        //Create bound queries
        var queries = _.map([ 
            Person.create(people) //Create base objects here
          ], function(q) { return q.exec.bind(q) })


        async.parallel(queries, function(err,data) {
          if (err)
            return cb(err)

          var person = data[0] //Refer to created base objects here
          

          var purchases = [
            {price:10000, paidBy:person[0], date:new Date()},
            {price:20000, paidBy:person[1], date:new Date()},
          ]

          Purchase.create(purchases, cb) //Create purchases
        })
      })
  } else {
    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)
    cb();
  }
};
