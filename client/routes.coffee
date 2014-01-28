Router.configure
  layoutTemplate: 'layout'
  waitOn: -> Meteor.subscribe('allDinners')

Router.map ->
  @route 'dinnersList',
    path: '/'
    template: 'dinnersList'
