import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Guests from '../../../imports/api/Guests';

import GuestDietaryRestrictionsField from '../components/GuestDietaryRestrictionsField';

class EditGuestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dietaryRestrictionIds: props.guest.dietaryRestrictionIds
    }
  }

  handleGuestDietaryRestrictionChange = (dietaryRestrictionIds) => {
    this.setState({ dietaryRestrictionIds })
  }

  handleSubmit = () => {
    this.props.save({
      dietaryRestrictionIds: this.state.dietaryRestrictionIds
    })
  }

  render() {
    const { guest, cancel } = this.props;

    return (
      <div>
        <div onClick={cancel} className="hallah-modal-drop"></div>
        <div className="hallah-modal">
          <div className="h-modal__header">
            <h5>Edit</h5>
            <h4>{guest.name}</h4>
          </div>

          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form-group h-modal__body">
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
        </div>
      </div>
    );
  }
}

export default withTracker(({ _id }) => {
  const guest = Session.get('editingGuest');

  function setGuestDietaryRestrictions(dietaryRestrictionIds) {
    Guests.update(_id, { $set: { dietaryRestrictionIds } });
  }

  function updateGuest(guestAttrs) {
    Guests.update(_id, {
      $set: {
        dietaryRestrictionIds: guestAttrs.dietaryRestrictionIds
      }
    });
    Meteor.closeModal('editingGuest');
  }

  function cancel() {
    Meteor.closeModal('editingGuest');
  }

  return {
    guest,
    setGuestDietaryRestrictions,
    save: updateGuest,
    cancel
  }
})(EditGuestPage);