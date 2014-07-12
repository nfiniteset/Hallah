Template.guestItem.helpers
  lastInvited: ->
    lastInvite = Invitations.findOne(guestId: @_id)
    return unless lastInvite
    lastDinner = Dinners.findOne(lastInvite.dinnerId)
    lastDinner.date
