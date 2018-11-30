import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Guests from '../../../lib/api/Guests';
import Dinners from '../../../lib/api/Dinners';
import Invitations from '../../../lib/api/Invitations';

import GuestDietaryRestrictionsField from '../components/GuestDietaryRestrictionsField';
import DinnerItem from '../components/DinnerItem';
import InvitationHistoryMarks from '../components/InvitationHistoryMarks';

class EditGuestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaryRestrictionIds: props.guest.dietaryRestrictionIds,
      name: props.guest.name
    }
  }

  handleGuestDietaryRestrictionChange = (dietaryRestrictionIds) => {
    this.setState({ dietaryRestrictionIds })
  }

  handleNameChange = (event) => {
    this.setState({ name: event.target.value })
  }

  handleSubmit = () => {
    this.props.save(this.state);
  }

  render() {
    const { cancel, dinners, invitations } = this.props;

    return (
      <div className="l-retainer">
        <div className="h-modal__header">
          <InvitationHistoryMarks invitations={invitations} />
        </div>

        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="guest-name" className="sr-only">Name</label>
            <input id="guest-name" value={this.state.name} onChange={this.handleNameChange} />
          </div>
          <div className="form-group">
            <GuestDietaryRestrictionsField
              onChange={this.handleGuestDietaryRestrictionChange}
              guestDietaryRestrictionIds={this.state.dietaryRestrictionIds}
            />
          </div>

          <ul className="h-radio-list">
            <li>
              <a
                className="h-radio-list__item h-radio-list__item--primary"
                onClick={this.handleSubmit}
              >
                Save
              </a>
            </li>
            <li>
              <a
                className="h-radio-list__item"
                onClick={cancel}
              >
                Cancel
              </a>
            </li>
          </ul>
        </form>
        <ul className="dinners-past-list">
          {dinners.map(dinner => (
            <DinnerItem key={dinner._id} {...dinner} />
          ))}
        </ul>
      </div>
    );
  }
}

export default withTracker(({ match, history }) => {
  const { _id } = match.params;
  const guest = Guests.findOne({ _id });
  const invitations = Invitations.find({ guestId: _id }).fetch();
  const dinners = Dinners.find({ _id: { $in: invitations.map(i => i.dinnerId )}}, { sort: { "date": -1 } }).fetch();

  function setGuestDietaryRestrictions(dietaryRestrictionIds) {
    Guests.update(_id, { $set: { dietaryRestrictionIds } });
  }

  function updateGuest(guestAttrs) {
    Guests.update(_id, {
      $set: {
        dietaryRestrictionIds: guestAttrs.dietaryRestrictionIds,
        name: guestAttrs.name
      }
    });
    history.goBack();
  }

  function cancel() {
    history.goBack();
  }

  return {
    guest,
    setGuestDietaryRestrictions,
    invitations,
    dinners,
    save: updateGuest,
    cancel
  }
})(EditGuestPage);