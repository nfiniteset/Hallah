Handlebars.registerHelper "debug", (optionalValue) ->
  console.log("Current Context")
  console.log("====================")
  console.log(@)

  if optionalValue
    console.log("Value")
    console.log("====================")
    console.log(optionalValue)

Handlebars.registerHelper "formatDate", (date) ->
  Meteor.formatDate date
