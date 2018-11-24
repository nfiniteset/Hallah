import React from 'react';
import GuestHistoryItem from './GuestsHistoryItem';

GuestsList = function GuestsList(props) {
  return (
    <ul>
      {props.guests.map(guest => <GuestHistoryItem id={guest._id} name={guest.name} key={guest.name}/>)}
    </ul>
  )
};
