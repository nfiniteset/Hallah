Template.editGuest.helpers
  editingGuest: ->
    Session.get 'editingGuest'

Template.editGuest.events
  'submit form, click .js-save': (event, instance) ->
    event.preventDefault()
    dietaryRestrictions = instance.find('.js-select-dietary-restrictions')
    guestAttributes =
      dietaryRestrictionIds: dietaryRestrictions.selectize.getValue()

    Guests.update(@_id, { $set: guestAttributes })
    Meteor.closeModal 'editingGuest'

  'click .js-cancel, click .js-close-modal': (event, instance) ->
    Meteor.closeModal 'editingGuest'

  'click .js-disable-guest': (event, instance) ->
    guestId = instance.data._id
    Meteor.call 'disableGuest', guestId, (err, id) ->
      alert err if err?
      console.log('guest disabled')
