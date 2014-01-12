@Guests = new Meteor.Collection 'guests',
  transform: (guest) ->
    _(guest).extend fullName: "#{guest.firstName} #{guest.lastName}"

Meteor.methods
  createGuest: (guestAttributes) ->
    unless guestAttributes.firstName
      throw new Meteor.Error(422, 'Please fill in a first name');

    Guests.insert
      firstName: guestAttributes.firstName
      lastName: guestAttributes.lastName
