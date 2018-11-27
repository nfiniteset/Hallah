import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import cn from 'classnames';
import moment from 'moment';

import Guests from '../../../imports/api/Guests';
import Dinners from '../../../imports/api/Dinners';
import Invitations from '../../../imports/api/Invitations';
import InvitationStates from '../../../imports/api/InvitationStates';

class GuestHistoryItem extends React.Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const { invitations, name, lastInvited, onEditGuestRequested } = this.props;
    const formattedLastInvited = lastInvited && moment(lastInvited).format('dddd MMMM D');

    return (
      <div className="guest-item" onClick={onEditGuestRequested}>
        <div className="l-retainer">
          <h3>{name}</h3>
          <ul className="guest-item__history">
            {invitations.map((invitation) => (
              <li
                className={cn(
                  'guest-item__history-item',
                  `guest-item__history-item--${InvitationStates.codeFor(invitation.state)}`
                  )}
                  key={`${name}-${invitation._id}`}
                >
                  |
              </li>
            ))}
          </ul>
          <p>
            {formattedLastInvited
              ? formattedLastInvited
              : "Never invited"}
          </p>
        </div>
      </div>
    )
  }
}

export default withTracker(({ _id }) => {
  const invitations = Invitations.find({ guestId: _id }).fetch();
  const lastDinner = Dinners.findOne(
    {
      _id: {
        $in: invitations.map((i) => i.dinnerId)
      }
    },
    {
      sort: { 'date': -1 }
    }
  );

  function openGuestEditModal() {
    const guest = Guests.findOne(_id);
    return Meteor.openModal("editingGuest", guest);
  }

  return {
    invitations,
    lastInvited: lastDinner ? lastDinner.date : undefined,
    onEditGuestRequested: openGuestEditModal,
  }
})(GuestHistoryItem);