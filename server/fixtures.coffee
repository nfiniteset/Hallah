states = [
  { index: "0", label: 'Invited' }
  { index: "1", label: 'Accepted' }
  { index: "2", label: 'Confirmed' }
  { index: "3", label: 'Canceled' }
  { index: "4", label: 'Showed' }
  { index: "5", label: 'No-showed' }
]

for state in states
  unless InvitationStates.findOne(label: state.label)
    InvitationStates.insert(state)

unless DietaryRestrictions.unknownRestriction()
  DietaryRestrictions.insert { "label": UNKNOWN_RESTRICTION_LABEL }
