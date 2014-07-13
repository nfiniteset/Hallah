@InvitationStates = new Meteor.Collection('invitation_states')

defaultQueryOptions = { sort: { "priority": 1 } }

InvitationStates.defaultState = ->
  InvitationStates.findOne {}, defaultQueryOptions

InvitationStates.expectedStates = ->
  InvitationStates.find { "expected": true }, defaultQueryOptions

InvitationStates.labelFor = (stateId) ->
  return unless stateId?
  id = stateId.toString()
  InvitationStates.findOne("id": stateId).label

InvitationStates.codeFor = (stateId) ->
  InvitationStates.labelFor(stateId).toLowerCase()
