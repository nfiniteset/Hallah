Router.configure
  layoutTemplate: 'layout'

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
    template: 'destroySession'
