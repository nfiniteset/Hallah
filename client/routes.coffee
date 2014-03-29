Router.configure
  layoutTemplate: 'layout'
  waitOn: -> Meteor.subscribe('futureDinners')

Router.map ->
  @route 'dinnersList',
    path: '/'
    template: 'dinnersList'
  @route 'newSession',
    path: '/sign_in'
    template: 'newSession'

requireLogin = (pause) ->
  if Meteor.loggingIn()
    return pause()
  else unless Meteor.user()
    @render 'newSession'
    pause()

Router.onBeforeAction(requireLogin);
