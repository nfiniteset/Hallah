isSignUp = false

params = (template) ->
  email: template.find('#login-email').value
  password: template.find('#login-password').value
  confirmPassword: template.find('#login-confirm-password').value

handleIt = (err) ->
  if err
    console.log('Error signing in', err)

isSignUp = (element) ->
  element.value == 'sign-up'

signIn = (params) ->
  Meteor.loginWithPassword params.email, params.password, handleIt

signUp = (params) ->
  Accounts.createUser params, handleIt


Template.newSession.events
  'submit #sign-in-form' : (event, template) ->
    event.preventDefault()
    if isSignUp($(template.find('[name=form-type]:checked'))[0])
      signUp(params(template))
    else
      signIn(params(template))
    return false

  'click #signup-button': (event, template) ->
    event.preventDefault()
    signUp(params(template))
    return false

  'change .new-session-form__radio': (event, template) ->
    $form = $(template.find('.new-session-form'))
    $submitBtn = $(template.find('#login-button'))
    $confirmPasswordEl = $(template.find('#login-confirm-password'))
    if isSignUp(event.target)
      $form.addClass('new-session-form--is-sign-up')
      $submitBtn.val('Sign up')
      $confirmPasswordEl.prop('disabled', false)
    else
      $form.removeClass('new-session-form--is-sign-up')
      $submitBtn.val('Sign in')
      $confirmPasswordEl.prop('disabled', true)
