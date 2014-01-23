Meteor.publish 'allDinners', ->
  Dinners.find { "hostId": @userId }, { "sort": { "date": -1 } }

Meteor.publish 'allGuests', ->
  Guests.find { "hostId": @userId }, { "sort": { "firstName": 1 } }

Meteor.publish 'invitations', ->
  dinnerIds = Dinners.find("hostId": @userId).map (d) -> d._id
  Invitations.find({ "dinnerId": { $in: dinnerIds } })

Meteor.publish 'invitationStates', ->
  InvitationStates.find()

Meteor.publish 'dietaryRestrictions', ->
  DietaryRestrictions.find()
