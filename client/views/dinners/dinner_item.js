import Dinners from '../../../imports/api/dinners';
import Guests from '../../../imports/api/guests';
import Invitations from '../../../imports/api/invitations';
import DietaryRestrictionsList from "../dinners/dietary_restrictions_list";

Template.dinnerItem.helpers({
  invitations() { return _invitations(this); },
  dietaryRestrictions() { return _dietaryRestrictions(this); },
  classes() {
    const classes = ['dinner'];
    if (moment().startOf('day').isAfter(this.date)) {
      classes.push('dinner--past');
    }
    return classes.join(' ');
  },
  DietaryRestrictionsList() { return DietaryRestrictionsList; }
});

Template.dinnerItem.rendered = function() {
  return _autosizeNotesField(this);
};

Template.dinnerItem.events({
  'change .js-dinner-notes'(event, instance) {
    const notes = $(event.currentTarget).val();
    return Dinners.update(this._id, { $set: { notes } });
  }});

var _invitations = function(instance, options) {
  if (options == null) { options = {}; }
  return Invitations.find(_({"dinnerId": instance._id}).extend(options));
};

var _dietaryRestrictions = function(instance) {
  const expectedStateIds = InvitationStates.expectedStates().map(state => state.id);
  const expectedInvitations = _invitations(instance, { "state": { $in: expectedStateIds } });
  const expectedGuestIds = expectedInvitations.map(invite => invite.guestId);
  const expectedGuests = Guests.find({ "_id": { $in: expectedGuestIds } });
  const restrictionIds = _(expectedGuests.map(guest => guest.dietaryRestrictionIds))
                      .chain().flatten().compact().uniq().value();

  return DietaryRestrictions.find({ "_id": { "$in": restrictionIds } });
};

var _autosizeNotesField = function(instance) {
  const notesEl = $(instance.find('.js-dinner-notes'));
  return notesEl.autosize().addClass('autosize-is-transitioning');
};
