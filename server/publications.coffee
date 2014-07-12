Meteor.publish 'futureDinners', ->
  today = moment().startOf('day').toDate().getTime()
  Meteor.publishWithRelations
    handle: @
    collection: Dinners
    filter:
      "hostId": @userId
      "date": { $gte: today }
    options:
      sort: { "date": -1 }
    mappings: [
      {
        reverse: true
        collection: Invitations
        key: 'dinnerId'
      }
    ]

Meteor.publish 'allGuests', ->
  Guests.find { "hostId": @userId }

Meteor.publish 'allInvitations', ->
  Meteor.publishWithRelations
    handle: @
    collection: Invitations
    filter:
      "hostId": @userId
    mappings: [
      {
        collection: Guests
        key: 'guestId'
      }
      {
        collection: Dinners
        key: 'dinnerId'
      }
    ]

Meteor.publish 'invitationStates', ->
  InvitationStates.find({}, { sort: { "priority": 1 } })

Meteor.publish 'dietaryRestrictions', ->
  DietaryRestrictions.find()
