Template.invitationItem.helpers
  guest: ->
    _(Guests.findOne @guestId).extend invitationId: @_id

  invitationStates: ->
    states = InvitationStates.find().map (state) =>
      state.selected = state.id == @state
      state

  editing: ->
    !!Session.get("editingGuest#{@_id}")

Template.invitationItem.events
  'change .js-select-invitation-state': (event, instance) ->
    stateIndex = $(event.currentTarget).val()

    if stateIndex == 'remove'
      Invitations.remove(@_id)
      return

    Invitations.update(@_id, { $set: { state: stateIndex } })

  'click .js-edit-guest': (event, instance) ->
    Session.set("editingGuest#{instance.data._id}", true)
