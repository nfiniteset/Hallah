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

Handlebars.registerHelper "year", (date) ->
  moment(date).format('YYYY')

Handlebars.registerHelper "currentUserLabel", ->
  currentUser = Meteor.user()
  return unless currentUser
  currentUser.emails[0].address

Handlebars.registerHelper "invitationStateCodeFor", (stateId) ->
  InvitationStates.codeFor(stateId)

Handlebars.registerHelper "invitationStateLabelFor", (stateId) ->
  InvitationStates.labelFor(stateId)
