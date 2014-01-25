_invitations = (instance, options = {}) ->
  Invitations.find _("dinnerId": instance._id).extend(options)

_dietaryRestrictions = (instance) ->
  expectedStateIds = InvitationStates.expectedStates().map (state) -> state.id
  expectedInvitations = _invitations(instance, { "state": { $in: expectedStateIds } })
  guestIds = expectedInvitations.map (invite) -> invite.guestId
  guests = Guests.find { "_id": { $in: guestIds } }
  restrictionIds = _(guests.map((guest) -> guest.dietaryRestrictionIds))
                      .chain().flatten().compact().uniq().value()

  DietaryRestrictions.find({ "_id": { "$in": restrictionIds } })

Template.dinnerItem.helpers
  invitations: -> _invitations(@)
  dietaryRestrictions: -> _dietaryRestrictions(@)

Template.dinnerItem.events
  'change .js-notes': (event, instance) ->
    notes = $(event.currentTarget).val()
    Dinners.update @_id, { $set: { notes: notes } }
