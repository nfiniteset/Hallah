Template.newInvitation.helpers
  invitableGuests: ->
    invitations = Invitations.find("dinnerId": @_id).fetch()
    invitedGuestIds = _(invitations).map (invite) -> invite.guestId
    Guests.find "_id": { $not: { $in: invitedGuestIds } }

Template.newInvitation.events
  'change .js-invite-guest': (event, instance) ->
    invitationAttributes =
      guestId: $(event.currentTarget).val()
      dinnerId: instance.data._id

    Meteor.call 'createInvitation', invitationAttributes, (err, id) ->
      return alert(err) if err

Template.newInvitation.rendered = ->
  $(this.find('.js-invite-guest')).selectize()
