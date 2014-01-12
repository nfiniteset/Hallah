@Guests = new Meteor.Collection('guests')

Meteor.methods
  createGuest: (guestAttributes) ->
    unless guestAttributes.firstName
      throw new Meteor.Error(422, 'Please fill in a first name');

    Guests.insert
      firstName: guestAttributes.firstName
      lastName: guestAttributes.lastName
