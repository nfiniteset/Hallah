Template.newInvitation.created = ->
  @dinnerInvites = Invitations.find("dinnerId": @data._id)
  _observeInvitations.apply(@)

_observeInvitations = ->
  @dinnerInvites.observe
    added: (invite) => _buildInvitableGuestsOptions.apply(@)
    removed: (oldInvte) => _buildInvitableGuestsOptions.apply(@)

Template.newInvitation.rendered = ->
  @selectize = _initSelectize(@)
  _buildInvitableGuestsOptions.apply(@)

_initSelectize = (template) ->
  invitableGuestsEl = $(template.find('.js-invite-guest'))
  invitableGuestsEl.selectize
    create: true
    valueField: '_id'
    labelField: 'name'
    searchField: 'name'
    openOnFocus: false
    create: (name, callback) -> _createAndInviteGuest(name, template, callback)
  invitableGuestsEl[0].selectize

_buildInvitableGuestsOptions = ->
  @dinnerInvites.rewind()
  invitedGuestIds = @dinnerInvites.map (invite) -> invite.guestId
  guests = Guests.invitable(invitedGuestIds).fetch()

  if @selectize?
    @selectize.clearOptions()
    @selectize.addOption(guests)

Template.newInvitation.destroyed = ->
  @find('.js-invite-guest').selectize.destroy()



Template.newInvitation.events
  'change .js-invite-guest': (event, instance) ->
    guestId = $(event.currentTarget).val()
    return unless guestId

    _inviteGuest(guestId, instance)
    instance.selectize.clear()

_createAndInviteGuest = (name, template, callback) ->
  _createGuest name, (guestId) ->
    _inviteGuest guestId, template, ->
      callback()

_createGuest = (name, callback) ->
  Meteor.call 'createGuest', { name: name }, (err, id) ->
    return alert(err) if err
    callback(id)

_inviteGuest = (guestId, template, callback) ->
  invitationAttributes =
    guestId: guestId
    dinnerId: template.data._id

  Meteor.call 'createInvitation', invitationAttributes, (err, id) ->
    return alert(err) if err
    _buildInvitableGuestsOptions.apply(template)
    callback() if callback?
    template.selectize.clear()
    template.selectize.blur()
    template.selectize.focus()
