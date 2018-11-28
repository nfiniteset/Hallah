import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Dinners from '../../../lib/api/Dinners';
import DinnerItem from '../components/DinnerItem';

function HistoryPage({ dinners }) {
  return (
    <ul className="dinners-past-list">
      {dinners.map(dinner => (
        <DinnerItem key={dinner._id} {...dinner} />
      ))}
    </ul>
  );
}

export default withTracker(({}) => {
  const today = moment().startOf('day').toDate().getTime();
  const dinners = Dinners.find({"date": { $lt: today }}, { sort: { "date": -1 } }).fetch();
  return {
    dinners
  }
})(HistoryPage);