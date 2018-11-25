import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Guests from '../../../imports/api/Guests';
import Invitations from '../../../imports/api/Invitations';
import CreatableSelect from 'react-select/lib/Creatable';

class InvitationForm extends React.Component {
  onGuestChosen = (option) => {
    if (option.__isNew__) {
      this.props.createAndInviteGuest(option.value)
    } else {
      this.props.inviteGuest(option.value);
    }
  }

  render() {
    const { invitableGuests } = this.props;
    const options = invitableGuests.map(g => ({ label: g.name, value: g._id }))
    return (
      <CreatableSelect
        options={options} 
        onChange={this.onGuestChosen}
        value={null}
        onChange={this.onGuestChosen}
        openMenuOnClick={false}
        placeholder="Invite"
      />
    );
  }
}

export default withTracker(({ dinnerId }) => {
  const dinnerInvites = Invitations.find({ dinnerId });
  const invitableGuests = Guests.invitable(
    dinnerInvites.map(invite => invite.guestId)
  ).fetch();

  function createAndInviteGuest(name) {
    createGuest(name, guestId =>
      inviteGuest(guestId)
    )
  }

  function createGuest(name, callback) {
    Meteor.call('createGuest', { name }, function(err, id) {
      if (err) { return alert(err); }
      return callback(id);
    })
  }

  function inviteGuest(guestId) {
    return Meteor.call('createInvitation', {
      guestId,
      dinnerId
    });
  };

  return {
    invitableGuests,
    createAndInviteGuest,
    inviteGuest
  }
})(InvitationForm);