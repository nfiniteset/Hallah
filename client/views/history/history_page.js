import Dinners from '../../../imports/api/Dinners';

Template.historyPage.helpers({
  dinners() {
    const today = moment().startOf('day').toDate().getTime();
    return Dinners.find({"date": { $lt: today }}, { sort: { "date": -1 } });
  }
});
