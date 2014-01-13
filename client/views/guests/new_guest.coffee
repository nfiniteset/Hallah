Template.newGuest.events
  'submit form': (e) ->
    e.preventDefault()
    $form = $(e.currentTarget)

    attrs =
      name: $('[name="guestName"]').val()

    Meteor.call 'createGuest', attrs, (err, id) ->
      if (err)
        alert(err)
      $form[0].reset()
