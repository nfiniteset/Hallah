import Guests from '../../../imports/api/guests';

Template.editGuest.helpers({
  editingGuest() {
    return Session.get('editingGuest');
  }
});

Template.editGuest.events({
  'submit form, click .js-save'(event, instance) {
    event.preventDefault();
    const dietaryRestrictions = instance.find('.js-select-dietary-restrictions');
    const guestAttributes =
      {dietaryRestrictionIds: dietaryRestrictions.selectize.getValue()};

    Guests.update(this._id, { $set: guestAttributes });
    return Meteor.closeModal('editingGuest');
  },

  'click .js-cancel, click .js-close-modal'(event, instance) {
    return Meteor.closeModal('editingGuest');
  }
});
