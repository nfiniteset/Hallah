import React from 'react';
import cn from 'classnames';
import { withTracker } from 'meteor/react-meteor-data';

import Guests from '../../../imports/api/Guests';
import Invitations from '../../../imports/api/Invitations';
import InvitationStates from '../../../imports/api/InvitationStates';
import DietaryRestrictions from '../../../imports/api/DietaryRestrictions';

import DietaryRestrictionsList from './DietaryRestrictionsList';

class InvitationItem extends React.Component {
  handleInvitationStateChange = (event) => {
    const stateId = event.target.value;

    if (stateId === 'remove') {
      return this.props.onInvitationRemoved();
    } else {
      return this.props.onInvitationStateChange(stateId);
    }
  }

  handleGuestNameChange = (event) => {
    this.props.onGuestNameChange(event.target.value);
  }

  render() {
    const { guest, states, state, dietaryRestrictions } = this.props;

    return (
      <li className={cn("invitation-item", `invitation-item--${state.label.toLowerCase()}`)}>
        <div className="invitation-item__guest-info" onClick={this.props.onEditGuestRequested}>
          <div className="invitation-item__guest-name">{guest.name}</div>
          <div
            className="invitation-item__dietary-restrictions dietary-restrictions"
          >
            <DietaryRestrictionsList dietaryRestrictions={dietaryRestrictions} />
          </div>
        </div>
        <select
          className="invitation-item__invitation-state"
          value={state.id}
          onChange={this.handleInvitationStateChange}
        >
          {states.map(state => (
            <option key={state.id} value={state.id}>{state.label}</option>
          ))}
          <option disabled="disabled"></option>
          <option value="remove">Remove invitation</option>
        </select>
      </li>
    )
  }
}

export default withTracker(({ guestId, _id, state }) => {
  const guest = { ...Guests.findOne(guestId), invitationId: _id};
  const states = InvitationStates.find().fetch();
  const invitationState = InvitationStates.findOne({ "id": state });
  const dietaryRestrictions = DietaryRestrictions.find({_id: { $in: guest.dietaryRestrictionIds }}).fetch();

  function openGuestEditModal() {
    const guest = Guests.findOne(guestId);
    return Meteor.openModal("editingGuest", guest);
  }

  function setInvitationState(stateId) {
    Invitations.update(_id, { $set: { state: stateId } });
  }

  function setGuestName(name) {
    Guests.update(guestId, { $set: { name } });
  }

  function removeInvitation() {
    Invitations.remove(_id);
  }

  return {
    guest, 
    states, 
    state: invitationState, 
    dietaryRestrictions,
    onEditGuestRequested: openGuestEditModal,
    onInvitationStateChange: setInvitationState,
    onGuestNameChange: setGuestName,
    onInvitationRemoved: removeInvitation
   };
})(InvitationItem);