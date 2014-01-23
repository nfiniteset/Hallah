_invitations = (instance) ->
  Invitations.find "dinnerId": instance._id

_dietaryRestrictions = (instance) ->
  guestIds = _invitations(instance).map (invite) -> invite.guestId
  guests = Guests.find { "_id": { $in: guestIds } }

  restrictionIds = _(guests.map((guest) -> guest.dietaryRestrictionIds))
                      .chain().flatten().compact().value()

  DietaryRestrictions.find(
    { "_id": { "$in": restrictionIds } },
    {
      fields: { "label": 1, "unknown": 1 }
    })

Template.dinnerItem.helpers
  invitations: -> _invitations(@)
  dietaryRestrictions: -> _dietaryRestrictions(@)

Template.dinnerItem.events
  'change .js-notes': (event, instance) ->
    notes = $(event.currentTarget).val()
    Dinners.update @_id, { $set: { notes: notes } }
