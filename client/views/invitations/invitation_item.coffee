invitationState = (instance) ->
  InvitationStates.findOne("id": instance.state)

Template.invitationItem.helpers
  guest: ->
    _(Guests.findOne @guestId).extend invitationId: @_id

  invitationStates: ->
    states = InvitationStates.find().map (state) =>
      state.selected = state.id == @state
      state

  stateLabel: ->
    invitationState(@).label

  stateClass: ->
    "invitation-state-#{invitationState(@).label.toLowerCase()}"

  editing: ->
    !!Session.get("editingGuest#{@_id}")

Template.invitationItem.events
  'click .js-edit-guest': (event, instance) ->
    Session.set("editingGuest#{instance.data._id}", true)
