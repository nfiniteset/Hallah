import { Mongo } from 'meteor/mongo';

const Guests = new Mongo.Collection('guests');

Guests.allow({
  update(userId, guest) {
    return guest.hostId === userId;
  }
});

Guests.invitable = invitedGuestIds =>
  Guests.find({
    _id: { $not: { $in: invitedGuestIds } }
  })
;

Meteor.methods({
  createGuest(params) {
    if (!params.name) {
      throw new Meteor.Error(422, 'Please fill in a name');
    }

    if (!params.dietaryRestrictionIds) {
      params.dietaryRestrictionIds = [DietaryRestrictions.unknownRestriction()._id];
    }

    return Guests.insert({
      hostId: this.userId,
      name: params.name,
      dietaryRestrictionIds: params.dietaryRestrictionIds
    });
  }
});

export default Guests;