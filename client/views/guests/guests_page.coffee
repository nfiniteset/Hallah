Template.guestsPage.helpers
  guests: -> Guests.find({}, {sort: {"name": 1}})
  GuestsList: -> GuestsList
