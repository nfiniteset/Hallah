route = (path, templateName) ->
  FlowRouter.route path,
    name: templateName
    action: -> render templateName
render = (templateName) ->
  BlazeLayout.render 'layout', { main: templateName }

FlowRouter.route '/',
  name: 'home'
  action: -> render 'dinnersList'
route '/dinnersList', 'dinnersList'
route '/history', 'dinnersPastList'
route '/guests', 'guestsList'
