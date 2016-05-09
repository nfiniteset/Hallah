import React, { PropTypes } from 'react';
import cn from 'classnames';

DietaryRestrictionsList = React.createClass({
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
      <div class="dietary-restrictions">
        {dietaryRestrictionBadges}
      </div>
    );
  }
});
