import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import moment from 'moment';

import Dinners from '../../../lib/api/Dinners';
import Invitations from '../../../lib/api/Invitations';

import Link from './Link';
import InvitationHistoryMarks from './InvitationHistoryMarks';

class GuestHistoryItem extends React.Component {
  static propTypes = {
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }

  render() {
    const { invitations, name, lastInvited, _id } = this.props;
    const formattedLastInvited = lastInvited && moment(lastInvited).format('dddd MMMM D');

    return (
      <Link to={`/guests/${_id}`} className="guest-item">
        <div className="l-retainer">
          <h3>{name}</h3>
          <InvitationHistoryMarks invitations={invitations} />
          <p>
            {formattedLastInvited
              ? formattedLastInvited
              : "Never invited"}
          </p>
        </div>
      </Link>
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

  return {
    invitations,
    lastInvited: lastDinner ? lastDinner.date : undefined
  }
})(GuestHistoryItem);
