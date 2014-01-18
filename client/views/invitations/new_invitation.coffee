Template.newInvitation.created = ->
  @dinnerInvites = Invitations.find(dinnerId: @data._id)
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
  invitableGuestsEl[0].selectize

_buildInvitableGuestsOptions = ->
  @dinnerInvites.rewind()
  invitedGuestIds = @dinnerInvites.map (invite) -> invite.guestId
  guests = Guests.find({ _id: { $not: { $in: invitedGuestIds }}}).fetch()

  if @selectize?
    @selectize.clearOptions()
    @selectize.addOption(guests)

Template.newInvitation.destroyed = ->
  @find('.js-invite-guest').selectize.destroy()



Template.newInvitation.events
  'change .js-invite-guest': (event, instance) ->
    guestId = $(event.currentTarget).val()
    return unless guestId

    invitationAttributes =
      guestId: guestId
      dinnerId: instance.data._id

    Meteor.call 'createInvitation', invitationAttributes, (err, id) ->
      return alert(err) if err

    instance.selectize.clear()
