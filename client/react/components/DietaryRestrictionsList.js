import React from 'react';
import cn from 'classnames';

function DietaryRestrictionsList({ dietaryRestrictions }) {
  return (
    <div className="dietary-restrictions">
      {dietaryRestrictions.map((dietaryRestriction) => (
        <span
          key={dietaryRestriction.label}
          className={cn('badge', { 'badge--danger': dietaryRestriction.unknown })} 
        >
          {dietaryRestriction.label}
        </span>
      ))}
    </div>
  );
}

export default DietaryRestrictionsList;