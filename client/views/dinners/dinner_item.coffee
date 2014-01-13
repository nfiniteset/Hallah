Template.dinnerItem.helpers
  invitations: ->
    Invitations.find "dinnerId": @_id

  guest: ->
    Guests.findOne @guestId

Template.dinnerItem.events
  'change .js-select-invitation-state': (event, instance) ->
    stateIndex = $(event.currentTarget).val()
    Invitations.update(@_id, { $set: { state: stateIndex } })
