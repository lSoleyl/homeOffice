/**
 * PersonController
 *
 * @description :: Server-side logic for managing Persons
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	index: function(req, res) { //List all people
    res.view("person/list") //Just render the view
  },

  create: function(req, res) {
    res.view() //Just render the default view
  },

  //Used to display creation form inside a BootstrapDialog
  partial_create: function(req, res) {
    res.view("person/partials/create", {layout:""}) //don't render a layout
  },

  view: function(req,res) { //Display a single person
    if (req.params.id) {
      Person.find({id: req.params.id}).exec(function (err,people) {
        if (err)
          return res.serverError(err)

        if (people.length != 1)
          return res.badRequest("Unknown person id given")

        var person = people[0]
        var viewObj = {
          person: {
            id: req.params.id,
            name: person.name
          }
        }
        
        return res.view(viewObj)
      })
    } else {
      return res.redirect("/person") //No id given, list all people
    }
  }
};

