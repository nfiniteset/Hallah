Router.configure
  layoutTemplate: 'layout'
  waitOn: -> Meteor.subscribe('futureDinners')

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


requireLogin = (pause) ->
  if Meteor.loggingIn()
    return pause()
  else unless Meteor.user()
    @render 'newSession'
    pause()

Router.onBeforeAction(requireLogin);
