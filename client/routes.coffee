Router.configure
  layout: 'layout'
  waitOn: -> Meteor.subscribe('allDinners')

Router.map ->
  @route 'dinnersList',
    path: '/'
    template: 'dinnersList'

  @route 'guestsList',
    path: 'guests/',
    template: 'guestsList',
    waitOn: -> Meteor.subscribe('allGuests')
