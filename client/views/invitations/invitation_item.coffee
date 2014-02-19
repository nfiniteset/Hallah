invitationState = (instance) ->
  InvitationStates.findOne("id": instance.state)

Template.invitationItem.helpers
  guest: ->
    _(Guests.findOne @guestId).extend invitationId: @_id

  stateLabel: ->
    invitationState(@).label

  stateClass: ->
    label = invitationState(@).label.toLowerCase()
    "invitation-state--#{label}"

  editing: ->
    !!Session.get("editingGuest#{@_id}")

Template.invitationItem.events
  'click .js-edit-guest': (event, instance) ->
    Session.set("editingGuest#{instance.data._id}", true)

  'click .js-edit-invitation': (event, instance) ->
    Meteor.openModal("editingInvitation", instance.data)
