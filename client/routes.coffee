route = (path, templateName) ->
  FlowRouter.route path,
    name: templateName
    action: -> render templateName
render = (templateName) ->
  BlazeLayout.render 'layout', { main: templateName }

FlowRouter.route '/',
  name: 'home'
  action: -> render 'dinnersPage'
route '/dinners', 'dinnersPage'
route '/guests', 'guestsPage'
route '/history', 'historyPage'
route '/guests/:id', 'guestPage'
