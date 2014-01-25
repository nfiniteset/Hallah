@InvitationStates = new Meteor.Collection('invitation_states')

defaultQueryOptions = { sort: { "priority": 1 } }

InvitationStates.defaultState = ->
  InvitationStates.findOne {}, defaultQueryOptions

InvitationStates.expectedStates = ->
  InvitationStates.find { "expected": true }, defaultQueryOptions