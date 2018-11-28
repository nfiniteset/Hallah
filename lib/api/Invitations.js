import { Mongo } from 'meteor/mongo';
import InvitationStates from './InvitationStates';

const Invitations = new Mongo.Collection('invitations');

Invitations.allow({
  remove() { return true; },
  update() { return true; }
});

Meteor.methods({
  createInvitation(params) {
    if (!params.guestId) {
      throw new Meteor.Error(422, 'Invitation must have a guest');
    }

    if (!params.dinnerId) {
      throw new Meteor.Error(422, 'Invitation must have a dinner');
    }

    const existingInvitation = Invitations.findOne({
      "guestId": params.guestId,
      "dinnerId": params.dinnerId
    });

    if (existingInvitation) {
      throw new Meteor.Error(422, 'Guest has already been invited to this dinner');
    }

    const invitationAttrs = {
      "guestId": params.guestId,
      "dinnerId": params.dinnerId,
      "state": InvitationStates.defaultState().id
    };

    return Invitations.insert(invitationAttrs);
  }
});

export default Invitations;