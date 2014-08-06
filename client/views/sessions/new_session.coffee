params = (template) ->
  email: template.find('#login-email').value
  password: template.find('#login-password').value

handleIt = (err) ->
  if err
    console.log('Error signing in')
  else
    Router.go 'home'

Template.newSession.events
  'submit #sign-in-form' : (event, template) ->
    event.preventDefault()
    args = params(template)
    Meteor.loginWithPassword args.email, args.password, handleIt
    return false

  'click #signup-button': (event, template) ->
    event.preventDefault()
    Accounts.createUser params(template), handleIt
    return false
