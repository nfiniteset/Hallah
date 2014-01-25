@Invitations = new Meteor.Collection 'invitations'

Invitations.allow
  remove: -> true
  update: -> true

Meteor.methods
  createInvitation: (params) ->
    unless params.guestId
      throw new Meteor.Error 422, 'Invitation must have a guest'

    unless params.dinnerId
      throw new Meteor.Error 422, 'Invitation must have a dinner'

    existingInvitation = Invitations.findOne
      "guestId": params.guestId
      "dinnerId": params.dinnerId

    if existingInvitation
      throw new Meteor.Error 422, 'Guest has already been invited to this dinner'

    invitationAttrs =
      "guestId": params.guestId
      "dinnerId": params.dinnerId
      "state": InvitationStates.defaultState().id

    Invitations.insert invitationAttrs
