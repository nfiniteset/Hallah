_invitations = (instance) ->
  Invitations.find "dinnerId": instance._id

_dietaryRestrictions = (instance) ->
  guestIds = _invitations(instance).map (invite) -> invite.guestId
  guests = Guests.find { "_id": { $in: guestIds } }

  restrictionIds = _(guests.map((guest) -> guest.dietaryRestrictionIds))
                      .chain().flatten().compact().value()

  restrictionLabels = DietaryRestrictions.find(
    { "_id": { "$in": restrictionIds } },
    {
      fields: { "label": 1 }
    })

Template.dinnerItem.helpers
  invitations: -> _invitations(@)
  dietaryRestrictions: -> _dietaryRestrictions(@)
  dietaryRestrictionText: ->
    _dietaryRestrictions(@).map((r) -> r.label).join(', ')

Template.dinnerItem.events
  'change .js-notes': (event, instance) ->
    notes = $(event.currentTarget).val()
    Dinners.update @_id, { $set: { notes: notes } }
