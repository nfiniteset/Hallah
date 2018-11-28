import Dinners from '../lib/api/Dinners';
import Guests from '../lib/api/Guests';
import Invitations from '../lib/api/Invitations';
import InvitationStates from '../lib/api/InvitationStates';
import DietaryRestrictions from '../lib/api/DietaryRestrictions';

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
