states = [
  {
    label: 'Invited'
    index: "0"
  }
  {
    label: 'Accepted'
    index: "1"
  }
  {
    label: 'Confirmed'
    index: "2"
  }
  {
    label: 'Canceled'
    index: "3"
  }
  {
    label: 'Showed'
    index: "4"
  }
  {
    label: 'No-showed'
    index: "5"
  }
]

for state in states
  unless InvitationStates.findOne(label: state.label)
    InvitationStates.insert(state)
