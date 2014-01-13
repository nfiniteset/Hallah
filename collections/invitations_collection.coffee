@Invitations = new Meteor.Collection 'invitations'

Invitations.allow
  remove: -> true
  update: -> true

Meteor.methods
  createInvitation: (invitationAttributes) ->
    unless invitationAttributes.guestId
      throw new Meteor.Error 422, 'Invitation must have a guest'

    unless invitationAttributes.dinnerId
      throw new Meteor.Error 422, 'Invitation must have a dinner'

    defaultState = InvitationStates.findOne()
    existingInvitation = Invitations.findOne
      "guestId": invitationAttributes.guestId
      "dinnerId": invitationAttributes.dinnerId

    if existingInvitation
      throw new Meteor.Error 422, 'Guest has already been invited to this dinner'

    Invitations.insert
      "guestId": invitationAttributes.guestId
      "dinnerId": invitationAttributes.dinnerId
      "state": defaultState.index
