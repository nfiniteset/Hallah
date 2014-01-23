invitations = (instance) ->
  Invitations.find "dinnerId": instance._id

Template.dinnerItem.helpers
  invitations: -> invitations(@)
  dietaryRestrictions: ->
    guestIds = invitations(@).map (invite) -> invite.guestId
    guests = Guests.find { "_id": { $in: guestIds } }

    restrictionIds = _(guests.map((guest) -> guest.dietaryRestrictionIds))
                        .chain().flatten().compact().value()

    restrictionLabels = DietaryRestrictions.find(
      { "_id": { "$in": restrictionIds } },
      {
        fields: { "label": 1 }
      }).map (r) -> r.label
    restrictionLabels.join(', ')

Template.dinnerItem.events
  'change .js-select-invitation-state': (event, instance) ->
    stateIndex = $(event.currentTarget).val()
    Invitations.update(@_id, { $set: { state: stateIndex } })
