import Guests from '../../../imports/api/guests';

Template.guestsPage.helpers({
  guests() { return Guests.find({}, {sort: {"name": 1}}); },
  GuestsList() { return GuestsList; }
});
