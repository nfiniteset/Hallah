Template.dinnersPage.helpers({
  dinners() {
    const today = moment().startOf('day').toDate().getTime();
    return Dinners.find({"date": { $gte: today }}, { sort: { "date": 1 } });
  }
});

Template.dinnersPage.events({
  'click .js-create-dinner'() {
    return Meteor.call('createDinner', function(error, id) {
      if (error) {
        return alert(error.reason);
      }
    });
  }
});
