import Guests from '../../../imports/api/guests';
Template.invitationItem.helpers({
  DietaryRestrictionsList() { return DietaryRestrictionsList; },
  states() {
    return InvitationStates.find().map(state => {
      state.selected = state.id === this.state;
      return state;
    });
  },

  guest() {
    return _(Guests.findOne(this.guestId)).extend({invitationId: this._id});
  },

  stateClass() {
    const label = InvitationStates.codeFor(this.state);
    return `invitation-item--${label}`;
  },

  dietaryRestrictions() {
    return DietaryRestrictions.find({_id: { $in: this.dietaryRestrictionIds }});
  }});

const openEditGuestModal = function(guestId) {
  const guest = Guests.findOne(guestId);
  return Meteor.openModal("editingGuest", guest);
};

Template.invitationItem.events({
  'click .js-edit-guest'(event, instance) {
    return openEditGuestModal(instance.data.guestId);
  },

  'change .js-edit-invitation-state'(event, instance) {
    const stateId = event.target.value;

    if (stateId === 'remove') {
      return Invitations.remove(this._id);
    } else if (stateId === 'editGuest') {
      return openEditGuestModal(instance.data.guestId);
    } else {
      return Invitations.update(this._id, { $set: { state: stateId } });
    }
  },

  'change .js-guest-name'(event, instance) {
    const name = $(event.currentTarget).val();
    return Guests.update(this._id, { $set: { name } });
  }});
