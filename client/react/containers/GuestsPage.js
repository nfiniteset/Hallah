import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Guests from '../../../lib/api/Guests';

import GuestHistoryItem from '../components/GuestsHistoryItem';

function GuestsPage({ guests }) {
  return (
    <ul>
      {guests.map(guest => (
        <GuestHistoryItem key={guest._id} {...guest} />
      ))}
    </ul>
  )
}

export default withTracker(() => {
  const guests = Guests.find({}, { sort: { name: 1 } }).fetch();
  return { guests };
})(GuestsPage);