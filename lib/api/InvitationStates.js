import { Mongo } from 'meteor/mongo';

const InvitationStates = new Mongo.Collection('invitation_states');

const defaultQueryOptions = { sort: { "priority": 1 } };

InvitationStates.defaultState = () => InvitationStates.findOne({}, defaultQueryOptions);

InvitationStates.expectedStates = () => InvitationStates.find({ "expected": true }, defaultQueryOptions);

InvitationStates.labelFor = function(stateId) {
  if (stateId == null) { return; }
  const id = stateId.toString();
  return InvitationStates.findOne({"id": stateId}).label;
};

InvitationStates.codeFor = stateId => InvitationStates.labelFor(stateId).toLowerCase();

export default InvitationStates;