import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Invitations from '../../../imports/api/Invitations';
import InvitationStates from '../../../imports/api/InvitationStates';
import Guests from '../../../imports/api/Guests';
import DietaryRestrictions from '../../../imports/api/DietaryRestrictions';
import Dinners from '../../../imports/api/Dinners';

import InvitationForm from "./InvitationForm";
import InvitationItem from "./InvitationItem";
import DietaryRestrictionsList from "./DietaryRestrictionsList";
import Textarea from 'react-textarea-autosize';

class DinnerItem extends React.Component {
  handleNotesChange = (event) => {
    this.props.onNotesChange(event.target.value);
  }

  render() {
    const { _id, dietaryRestrictions, notes, date, invitations } = this.props;
    const classes = "TODO"; // TODO
    const formattedDate = moment(date).format('dddd MMMM D');

    return (
      <li className={classes}>
        <header className="dinner__header l-retainer">
          <DietaryRestrictionsList dietaryRestrictions={dietaryRestrictions} />
          <h1 className="dinner__title">{formattedDate}</h1>
        </header>
        <div className="dinner__body l-retainer">
          <div className="form-group">
            <Textarea
              className="hallah-form-control js-dinner-notes"
              placeholder="Notes"
              onChange={this.handleNotesChange}
              value={notes}
            />
          </div>
          <ul className="dinner__invitation-list">
            {invitations.length > 0
              ? invitations.map(invite => (
                  <InvitationItem key={invite.guestId} guestId={invite.guestId} _id={invite._id} state={invite.state} />
                ))
              : <li className="invitation-item text-muted">No guests invited</li>
            }
          </ul>
          <div className="form-group">
            <InvitationForm dinnerId={_id} />
          </div>
        </div>
      </li>
    );
  }
}

export default withTracker(({ _id }) => {
  const invitations = Invitations.find({ dinnerId: _id }).fetch();

  var dietaryRestrictions = function(dinnerId) {
    const expectedStateIds = InvitationStates.expectedStates().map(state => state.id);
    const expectedInvitations = Invitations.find({ dinnerId: dinnerId, state: { $in: expectedStateIds } });
    const expectedGuestIds = expectedInvitations.map(invite => invite.guestId);
    const expectedGuests = Guests.find({ _id: { $in: expectedGuestIds } });
    const restrictionIds = _(expectedGuests.map(guest => guest.dietaryRestrictionIds))
                        .chain().flatten().compact().uniq().value();
  
    return DietaryRestrictions.find({ _id: { "$in": restrictionIds } }).fetch();
  };

  function setNotes(notes) {
    Dinners.update(_id, { $set: { notes } });
  }

  return {
    invitations: invitations,
    dietaryRestrictions: dietaryRestrictions(_id),
    onNotesChange: setNotes
  }
})(DinnerItem);