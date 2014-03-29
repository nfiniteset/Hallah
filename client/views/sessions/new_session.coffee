Template.newSession.events
  'submit #sign-in-form' : (event, template) ->
    event.preventDefault()

    email = template.find('#login-email').value
    password = template.find('#login-password').value

    Meteor.loginWithPassword email, password, (err) ->
      if (err)
        console.log('Error signing in')
      else
        Router.go 'home'

    return false;
