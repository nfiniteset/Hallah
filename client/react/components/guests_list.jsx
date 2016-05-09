import React, { PropTypes } from 'react';

GuestsList = React.createClass({
  renderGuests() {
    return this.props.guests.map((guest) => {
      return (
        <GuestHistoryItem id={guest._id} name={guest.name} key={guest.name}/>
      )
    });
  },

  render() {
    return (
      <ul>
        {this.renderGuests()}
      </ul>
    )
  }
});
