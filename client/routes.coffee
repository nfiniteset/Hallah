Router.configure
  layout: 'layout'
  waitOn: -> Meteor.subscribe('allDinners')

Router.map ->
  @route 'dinnersList',
    path: '/'
    template: 'dinnersList'
