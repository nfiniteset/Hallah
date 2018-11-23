Template.guestsPage.helpers({
  guests() { return Guests.find({}, {sort: {"name": 1}}); },
  GuestsList() { return GuestsList; }
});
