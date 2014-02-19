Template.dinnerItem.helpers
  invitations: -> _invitations(@)
  dietaryRestrictions: -> _dietaryRestrictions(@)
  classes: ->
    classes = ['dinner']
    if moment().isAfter(@date)
      classes.push 'dinner--past'
    classes.join(' ')

Template.dinnerItem.rendered = ->
  _autosizeNotesField(@)

Template.dinnerItem.events
  'change .js-dinner-notes': (event, instance) ->
    notes = $(event.currentTarget).val()
    Dinners.update @_id, { $set: { notes: notes } }

_invitations = (instance, options = {}) ->
  Invitations.find _("dinnerId": instance._id).extend(options)

_dietaryRestrictions = (instance) ->
  expectedStateIds = InvitationStates.expectedStates().map (state) -> state.id
  expectedInvitations = _invitations(instance, { "state": { $in: expectedStateIds } })
  expectedGuestIds = expectedInvitations.map (invite) -> invite.guestId
  expectedGuests = Guests.find { "_id": { $in: expectedGuestIds } }
  restrictionIds = _(expectedGuests.map((guest) -> guest.dietaryRestrictionIds))
                      .chain().flatten().compact().uniq().value()

  DietaryRestrictions.find({ "_id": { "$in": restrictionIds } })

_autosizeNotesField = (instance) ->
  notesEl = $(instance.find('.js-dinner-notes'))
  notesEl.autosize().addClass('autosize-is-transitioning')

