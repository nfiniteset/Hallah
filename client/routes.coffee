Router.configure
  layoutTemplate: 'layout'
  waitOn: -> Meteor.subscribe('allDinners')

Router.map ->
  @route 'home',
    action: ->
      @redirect 'dinnersList'
  @route 'dinnersList',
    path: '/'
    template: 'dinnersList'
  @route 'dinnersPastList',
    path: '/history'
    template: 'dinnersPastList'
  @route 'guestsList',
    path: '/guests',
    template: 'guestsList'
  @route 'newSession',
    path: '/sign_in'
    template: 'newSession'
  @route 'destroySession',
    path: '/sign_out'
    action: ->
      Meteor.logout()
      @redirect 'newSession'


requireLogin = () ->
  if Meteor.loggingIn()
    return
  else unless Meteor.user()
    @render 'newSession'
  else
    @next()

Router.onBeforeAction(requireLogin);
