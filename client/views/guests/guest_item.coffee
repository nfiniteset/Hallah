Template.guestItem.helpers
  lastInvited: ->
    inviteIds = Invitations.find(guestId: @_id).map((i) -> i.dinnerId)
    lastDinner = Dinners.findOne({_id: {$in: inviteIds }}, { sort: { 'date': -1 }})
    if lastDinner
      lastDinner.date
    else
      undefined
