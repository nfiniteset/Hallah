@Guests = new Meteor.Collection 'guests'

Guests.allow
  update: -> true

Meteor.methods
  createGuest: (guestAttributes) ->
    unless guestAttributes.name
      throw new Meteor.Error(422, 'Please fill in a name');

    Guests.insert
      name: guestAttributes.name
