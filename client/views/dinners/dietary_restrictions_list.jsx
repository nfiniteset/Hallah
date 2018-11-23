import React from 'react';
import cn from 'classnames';

class DietaryRestrictionsList extends React.Component {
  render() {
    let dietaryRestrictionBadges = this.props.dietaryRestrictions.map(function(dietaryRestriction){
      let classNames = cn('badge', {
        'badge--danger': dietaryRestriction.unknown
      });

      return (
        <span className={classNames} key={dietaryRestriction.label}>{dietaryRestriction.label}</span>
      );
    });

    return (
      <div className="dietary-restrictions">
        {dietaryRestrictionBadges}
      </div>
    );
  }
}

export default DietaryRestrictionsList;