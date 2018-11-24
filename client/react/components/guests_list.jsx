import React from 'react';
import GuestHistoryItem from './guests_history_item';

GuestsList = function GuestsList(props) {
  return (
    <ul>
      {props.guests.map(guest => <GuestHistoryItem id={guest._id} name={guest.name} key={guest.name}/>)}
    </ul>
  )
};
