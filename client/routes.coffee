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

requireLogin = ->
  unless Meteor.user()
    console.log 'User not signed in. Redirecting to sign in screen.'
    @render 'newSession'
    @pause()

Router.before(requireLogin);
