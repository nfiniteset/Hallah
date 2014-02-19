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
  'click .js-set-state': (event) ->
    invitationState = @
    invitationId = Session.get('editingInvitation')._id

    Invitations.update(invitationId, { $set: { state: invitationState.id } })
    closeModal()

  'click .js-remove-invitation': (event) ->
    invitationId = Session.get('editingInvitation')._id

    Invitations.remove(invitationId)
    closeModal()

  'click .js-close-modal': (event, instance) ->
    closeModal()
