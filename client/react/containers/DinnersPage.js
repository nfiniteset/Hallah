import React from 'react';
import { withTracker } from 'meteor/react-meteor-data';

import Dinners from '../../../imports/api/Dinners';
import DinnerItem from '../components/DinnerItem';

class DinnersPage extends React.Component {
  render() {
    const { _id, dinners, notes, date, createDinner } = this.props;

    return (
      <div>
        <ul className="dinners-list">
          {dinners.map(dinner => (
            <DinnerItem key={dinner._id} {...dinner} />
          ))}
        </ul>
        <a className="paginate-btn" onClick={createDinner}>
          <h1 className="l-retainer">Next dinner</h1>
        </a>
      </div>
    )
  }
}

export default withTracker(({}) => {
  const today = moment().startOf('day').toDate().getTime();
  const dinners = Dinners.find({date: { $gte: today }}, { sort: { date: 1 } }).fetch();

  function createDinner() {
    Meteor.call('createDinner', function(error, id) {
      if (error) {
        return alert(error.reason);
      }
    });
  }

  return {
    dinners,
    createDinner
  }
})(DinnersPage);