@Guests = new Meteor.Collection 'guests',
  transform: (guest) -> _(guest).extend(fullName: guest.name)

Guests.allow
  update: (userId, guest) ->
    guest.hostId == userId

Guests.invitable = (invitedGuestIds) ->
  Guests.find({
    _id: { $not: { $in: invitedGuestIds } }
  })

Meteor.methods
  createGuest: (params) ->
    unless params.name
      throw new Meteor.Error(422, 'Please fill in a name');

    unless params.dietaryRestrictionIds
      params.dietaryRestrictionIds = [DietaryRestrictions.unknownRestriction()._id]

    Guests.insert
      hostId: @userId
      name: params.name
      dietaryRestrictionIds: params.dietaryRestrictionIds
