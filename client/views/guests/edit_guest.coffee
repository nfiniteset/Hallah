Template.editGuest.events
  'submit form': (event, instance) ->
    event.preventDefault()
    guestAttributes =
      name: instance.find('[name=guestName]').value

    Guests.update(@_id, { $set: guestAttributes })
    Session.set("editingGuest#{instance.data.invitationId}", false)

  'click .js-cancel': (event, instance) ->
    event.preventDefault()
    Session.set("editingGuest#{instance.data.invitationId}", false)
