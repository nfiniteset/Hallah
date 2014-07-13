Template.guestsList.helpers
  guests: ->
    Guests.find({}, {sort: {"name": 1}})
