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
    Meteor.closeModal 'editingInvitation'

  'click .js-remove-invitation': (event) ->
    invitationId = Session.get('editingInvitation')._id

    Invitations.remove(invitationId)
    Meteor.closeModal 'editingInvitation'

  'click .js-close-modal': (event, instance) ->
    Meteor.closeModal 'editingInvitation'
