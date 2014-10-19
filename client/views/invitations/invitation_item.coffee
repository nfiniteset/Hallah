Template.invitationItem.helpers
  states: ->
    InvitationStates.find().map (state) =>
      state.selected = state.id == @state
      state

  guest: ->
    _(Guests.findOne @guestId).extend invitationId: @_id

  stateClass: ->
    label = InvitationStates.codeFor(@state)
    "invitation-state--#{label}"

  dietaryRestrictions: ->
    DietaryRestrictions.find _id: { $in: @dietaryRestrictionIds }

Template.invitationItem.events
  'click .js-edit-guest': (event, instance) ->
    guest = Guests.findOne(instance.data.guestId)
    Meteor.openModal("editingGuest", guest)

  'change .js-edit-invitation-state': (event, instance) ->
    stateId = event.target.value

    if stateId == 'remove'
      Invitations.remove(@_id)
    else
      Invitations.update(@_id, { $set: { state: stateId } })

  'change .js-guest-name': (event, instance) ->
    name = $(event.currentTarget).val()
    Guests.update @_id, { $set: { name: name } }

