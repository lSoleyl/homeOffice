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
     *                  model:Model            - the model to use for this handler
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

    /** Generate the callback function for the JSON view action to show an element of the model
     *  
     * @param options
     *           queryMapper:function(query)   - can be used to call populate, before exec is called
     *              dbMapper:function(dbObj)   - a function to convert dbObjects into returnable objects. 
     *                                           default: Convert.fromDatabase()
     *           objectMapper:function(object) - can be used to convert the object into the result object.
     *                  model:Model            - the model to use for this handler
     *                                           alternatively set the model property of the controller.
     */
    view: function(options) {
      options = options || {}
      options.dbMapper = options.dbMapper || Convert.fromDatabase

      return function(req,res) { //Return detailed information about one element
        if (!req.params.id)
          return res.badRequest("Missing id parameter")

        var model = options.model || eval(this.model)
        var query = model.find({id: parseInt(req.params.id)})

        if (options.queryMapper)
          query = options.queryMapper(query)

        query.exec(function (err,elements) {
          if (err)
            return res.serverError(err)

          if (elements.length != 1)
            return res.badRequest("Unknown shop id given")

          var element = options.dbMapper(elements[0])
          
          if (options.objectMapper)
            element = options.objectMapper(element)
          
          return res.json(element)
        })
      }
    },
    
    /** Generate a callback for object creation by passing an object containing the required fields
     * 
     * @param options
     *          fields:string[] - list of allowed and required fields
     */
    create: function(options) {
      options = options || {}

      return function(req, res) {
        var model = options.model || eval(this.model)

        //validate input
        var fields = options.fields || []
        var object = _.pick(req.body, fields) //Pick out only allowed attributes

        if (! _.all(fields, function(field) { return !!object[field] }))
          return res.badRequest("object can't be created, because not all required fields were present")


        model.create(object).exec(function(err,data) {
          if (err) {
            console.error("Coudln't create object: " + JSON.stringify(object) + " (" + model + ")")
            console.error(err)
            return res.serverError("Object creation failed")
          }

          return res.json(data)
        })
      }
    },

    /** Generate a callback for object deletion by passing an array of ids
     *
     * @param options
     *          model:Model - the model to use
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



  },

  Models: {

    /** This this function returns a resolver function to be used in a model (this must be the model)
     * 
     * @param model the model to resolve the id for
     * @param object the object to look up (id might be int or string)
     * @param options (optional) 
     *            - populate:string|array - The field/s which should be populated
     * @param callback the callback which will be called with the dbObject if lookup was successful, or not 
     *                 necessary  
     */
    resolve:function(model, object, options, callback) {
      if (!callback) {
        callback = options
        options = {}
      }

      if (typeof object != "number" && typeof object != "string") 
        return process.nextTick(function() { callback(null, object) })

      //This should be the model itself
      var query = model.find({'id':parseInt(object)})
      if (options.populate)
        query = query.populate(options.populate)

      query.exec(function(err, elements) {
        if (err || !elements.length)
          return callback(err || ("object with id " + object + " doesn't exist"))

        callback(null, elements[0]) //find always returns an array, so unpack it
      })
    }
  }


 }