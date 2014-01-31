Template.invitationEdit.helpers
  states: ->
    InvitationStates.find().map (state) =>
      state.selected = state.id == @state
      state

  dinner: ->
    Dinners.findOne @dinnerId

  guest: ->
    Guests.findOne @guestId

  invitationStateClasses: ->
    if @selected then 'selected' else ''

  editingInvitation: ->
    Session.get 'editingInvitation'
    Invitations.findOne()

Template.invitationEdit.events
  'click .js-set-state': (event, instance) ->
    stateId = $(event.currentTarget).data('id').toString()
    console.log instance
    Invitations.update(@_id, { $set: { state: stateId } })

  'click .js-remove-invitation': (event, instance) ->
    Invitations.remove(@_id)
    return
