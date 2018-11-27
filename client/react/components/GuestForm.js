import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

class GuestForm extends React.Component {
  handleDietaryRestrictionChange(dietaryRestrictions) {
    console.log(dietaryRestrictions);
  }

  render() {
    return (
      <div>
        <div class="hallah-modal-drop js-close-modal"></div>
        <div class="hallah-modal">
          <div class="h-modal__header">
            <h5>Edit</h5>
            <h4>{{name}}</h4>
          </div>
    
          <form class="form">
            <div class="form-group h-modal__body">
              <GuestDietaryRestrictionsField
                guestDietaryRestrictions={[]} 
                onDietaryRestrictionChange={this.handleDietaryRestrictionChange}
              />
            </div>
    
            <ul class="h-radio-list">
              <li><a class="js-save h-radio-list__item h-radio-list__item--primary">Save</a></li>
              <li><a class="js-cancel h-radio-list__item">Cancel</a></li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}

export default withTracker(({  }) => {
  return {
    dietaryRestrictions
  }
})(GuestForm);