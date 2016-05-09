import React, { PropTypes } from 'react';

GuestHistoryItem = React.createClass({
  propTypes: {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  },

  invitations() {
    return Invitations.find({ "guestId": this.props.id });
  },

  lastInvited() {
    inviteIds = Invitations.find({ guestId: this.props.id }).map((i) => i.dinnerId);
    lastDinner = Dinners.findOne({ _id: { $in: inviteIds } }, { sort: { 'date': -1 }});
    if (lastDinner) {
      return lastDinner.date;
    } else {
      return undefined;
    }
  },

  renderInvitations() {
    return this.invitations().map((invitation) => {
      let classNames = [
        'guest-item__history-item',
        `guest-item__history-item--${InvitationStates.codeFor(invitation.state)}`
      ].join(' ');
      let key = `${this.props.name}-${invitation._id}`

      return (
        <li className={classNames} key={key}>|</li>
      )
    });
  },

  formatDate(date) {
    return moment(date).format('dddd MMMM D')
  },

  renderLastInvited() {
    // <span>Last invited: {{formatDate lastInvited}}, {{year lastInvited}}</span>
    let last = this.lastInvited()
    if (last) {
      return this.formatDate(last)
    } else {
      return "Never invited"
    }
  },

  render() {
    return (
      <div className="guest-item">
        <div className="l-retainer">
          <h3>{this.props.name}</h3>
          <ul className="guest-item__history">
            {this.renderInvitations()}
          </ul>
          <p>
            {this.renderLastInvited()}
          </p>
        </div>
      </div>
    )
  }
});
