import Dinners from '../imports/api/dinners';
import Guests from '../imports/api/guests';
import Invitations from '../imports/api/invitations';

Meteor.publish('allDinners', function() {
  return Meteor.publishWithRelations({
    handle: this,
    collection: Dinners,
    filter: {
      "hostId": this.userId
    },
    options: {
      sort: { "date": -1 }
    },
    mappings: [
      {
        reverse: true,
        collection: Invitations,
        key: 'dinnerId'
      }
    ]});
});

Meteor.publish('allGuests', function() {
  return Meteor.publishWithRelations({
    handle: this,
    collection: Guests,
    filter: {
      "hostId": this.userId
    },
    mappings: [{
        collection: Invitations,
        key: 'guestId',
        reverse: true,
        mappings: [{
          key: 'dinnerId',
          collection: Dinners
        }]
      }]});
});

Meteor.publish('invitationStates', () => InvitationStates.find({}, { sort: { "priority": 1 } }));
Meteor.publish('dietaryRestrictions', () => DietaryRestrictions.find());
