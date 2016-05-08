Template.requireLogin.helpers
  loggingIn: ->
    Meteor.loggingIn()
  noUser: ->
    !Meteor.loggingIn() && !Meteor.user()
  loggedIn: ->
    Meteor.user()
