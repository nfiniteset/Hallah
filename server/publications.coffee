Meteor.publish 'futureDinners', ->
  today = new Date().getTime()
  Dinners.find { "hostId": @userId, "date": { $gt: today } }, { "sort": { "date": -1 } }

Meteor.publish 'allGuests', ->
  Guests.find { "hostId": @userId }

Meteor.publish 'invitations', ->
  dinnerIds = Dinners.find("hostId": @userId).map (d) -> d._id
  Invitations.find({ "dinnerId": { $in: dinnerIds } })

Meteor.publish 'invitationStates', ->
  InvitationStates.find({}, { sort: { "priority": 1 } })

Meteor.publish 'dietaryRestrictions', ->
  DietaryRestrictions.find()
