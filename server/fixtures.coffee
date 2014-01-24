states = [
  { id: "0", label: 'Invited', expected: true, priority: 0 }
  { id: "1", label: 'Accepted', expected: true, priority: 1 }
  { id: "6", label: 'Tentative', expected: true, priority: 2 }
  { id: "7", label: 'Declined', expected: false, priority: 3 }
  { id: "2", label: 'Confirmed', expected: true, priority: 4 }
  { id: "3", label: 'Canceled', expected: false, priority: 5 }
  { id: "4", label: 'Showed', expected: true, priority: 6 }
  { id: "5", label: 'No-showed', expected: false, priority: 7 }
]

for state in states
  existingState = InvitationStates.findOne(id: state.id)
  if existingState
    InvitationStates.update(state._id, state)

unless DietaryRestrictions.unknownRestriction()
  DietaryRestrictions.insert { "label": UNKNOWN_RESTRICTION_LABEL }
