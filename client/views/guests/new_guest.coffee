Template.newGuest.events
  'submit form': (e) ->
    e.preventDefault()
    $form = $(e.currentTarget)

    attrs =
      firstName: $('[name="guest[firstName]"]').val()
      lastName: $('[name="guest[lastName]"]').val()

    Meteor.call 'createGuest', attrs, (err, id) ->
      if (err)
        alert(err)
      $form[0].reset()
