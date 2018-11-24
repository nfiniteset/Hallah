import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Guests from '../../../imports/api/Guests';

import GuestHistoryItem from '../components/GuestsHistoryItem';

function GuestsPage({ guests }) {
  return (
    <ul>
      {guests.map(guest => (
        <GuestHistoryItem id={guest._id} name={guest.name} key={guest.name}/>
      ))}
    </ul>
  )
}

export default withTracker(() => {
  const guests = Guests.find({}, { sort: { name: 1 } });
  return { guests };
})(GuestsPage);