Router.configure
  layoutTemplate: 'layout'
  waitOn: -> Meteor.subscribe('futureDinners')

Router.map ->
  @route 'dinnersList',
    path: '/'
    template: 'dinnersList'
