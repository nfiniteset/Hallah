import Dinners from '../imports/api/Dinners';
import Guests from '../imports/api/Guests';
import Invitations from '../imports/api/Invitations';
import InvitationStates from '../imports/api/InvitationStates';
import DietaryRestrictions from '../imports/api/DietaryRestrictions';

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
