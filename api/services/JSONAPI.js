/** A generic module to generate JSON-APIs and reuse common code for basic operations.
 * 
 *  To use the Controller function in JSONAPI.Controllers, you should the model attribute to your
 *  controller, so that JSONAPI knows which model your controller is responsible for.
 *  Eg:
 *  module.exports = {
 *    model: 'Person',
 *    index: JSONAPI.list()
 *  }
 * 
 *  Most functions are highly configurable, with useful defaults to prevent being overly verbose.
 */
 module.exports = {
  QueryMappers: {
    populate: function(what) { return function(query) { return query.populate(what) } }
  },


  Controllers: {

    /** Generate the callback function for the JSON index action to list all elements of a model
     *  
     * @param options
     *           queryMapper:function(query)   - can be used to call populate, before exec is called
     *              dbMapper:function(dbObj)   - a function to convert dbObjects into returnable objects. 
     *                                           default: Convert.fromDatabase()
     *           objectMapper:function(object) - can be used to convert the object into the result object.
     *                  model:string           - the model to use for this handler
     *                                           alternatively set the model property of the controller.
     */
    list: function(options) {
      options = options || {}
      options.dbMapper = options.dbMapper || Convert.fromDatabase
      return function(req,res) {
        var model = options.model || eval(this.model)
        var query = model.find()
        if (options.queryMapper)
          query = options.queryMapper(query)

        query.exec(function(err, entities) {
          if (err)
            res.serverError(err)

          resultArray = _.map(entities, function (dbObject) {
            var object = options.dbMapper(dbObject)
            var resultObject = options.objectMapper ? options.objectMapper(object) : object
            return resultObject
          })
          return res.json(resultArray)
        })
      }
    },


    //TODO implement 'view' to return detailed information about a single entity


    /** Generate a callback for object deletion by passing an array of ids
     *
     * @param options
     *          model:string - the model to use
     */
    delete: function(options) { //FIXME error that json can't be parsed, when just a number is passed in the request body
      options = options || {}

      return function(req, res) { //Deletes the model elements by id
        var ids = (_.isNumber(req.body)) ? [ req.body ] : req.body


        if (!ids || ! _.all(ids, _.isNumber)) //Validate id array (to prevent someone from entering criteria objects)
          return res.badRequest("Expected list of ids to delete")

        if (!ids.length || ids.length == 0)
          return res.badRequest("Expected not empty list of ids to delete")

        var model = options.model || eval(this.model)

        model.destroy(ids).exec(function(err, records) {
          if (err) {
            console.error("Couldn't delete " + JSON.stringify(ids))
            console.error(err)
            return res.serverError("Couldn't delete entries")
          }

          return res.json({ affectedRecords:records.length })
        })
      }
    }



  }


 }