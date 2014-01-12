@Invitations = new Meteor.Collection('invitations')

Meteor.methods
  createInvitation: (invitationAttributes) ->
    unless invitationAttributes.guestId
      throw new Meteor.Error(422, 'Invitation must have a guest');
    unless invitationAttributes.dinnerId
      throw new Meteor.Error(422, 'Invitation must have a dinner');
    existingInvitation = Invitations.findOne
      "guestId": invitationAttributes.guestId
      "dinnerId": invitationAttributes.dinnerId
    console.log existingInvitation
    if existingInvitation
      throw new Meteor.Error(422, 'Guest has already been invited to this dinner');

    Invitations.insert
      "guestId": invitationAttributes.guestId
      "dinnerId": invitationAttributes.dinnerId
