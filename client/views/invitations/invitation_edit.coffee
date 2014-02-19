closeModal = ->
  Session.set('editingInvitation', undefined)

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

Template.invitationEdit.events
  'click .js-set-state': (event, instance) ->
    stateId = $(event.currentTarget).data('id').toString()
    console.log instance.data
    # Invitations.update(@_id, { $set: { state: stateId } })
    # closeModal()

  'click .js-remove-invitation': (event, instance) ->
    console.log instance.data
    # Invitations.remove(@_id)
    # closeModal()

  'click .js-close-modal': (event, instance) ->
    closeModal()
