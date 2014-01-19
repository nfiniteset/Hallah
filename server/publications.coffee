Meteor.publish 'allDinners', ->
  Dinners.find { "hostId": @userId }, { "sort": { "date": -1 } }

Meteor.publish 'allGuests', ->
  Guests.find {}, { "sort": { "firstName": 1 } }

Meteor.publish 'invitations', ->
  Invitations.find()

Meteor.publish 'invitationStates', ->
  InvitationStates.find()
