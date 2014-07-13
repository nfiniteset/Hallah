Template.invitationItem.helpers
  guest: ->
    _(Guests.findOne @guestId).extend invitationId: @_id

  stateClass: ->
    label = InvitationStates.codeFor(@state)
    "invitation-state--#{label}"

  dietaryRestrictions: ->
    DietaryRestrictions.find _id: { $in: @dietaryRestrictionIds }

Template.invitationItem.events
  'click .js-edit-guest': (event, instance) ->
    guest = Guests.findOne(instance.data.guestId)
    Meteor.openModal("editingGuest", guest)

  'click .js-edit-invitation': (event, instance) ->
    Meteor.openModal("editingInvitation", instance.data)
