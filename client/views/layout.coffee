Template.layout.onCreated ->
  template = @
  template.autorun ->
    template.subscribe('allDinners')
    template.subscribe('allGuests')
    template.subscribe('invitations')
    template.subscribe('invitationStates')
    template.subscribe('dietaryRestrictions')

Template.layout.helpers
  appReady: ->
    Template.instance().subscriptionsReady()
