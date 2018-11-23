Template.header.events({
  'click .js-sign-out-btn'() {
    return Meteor.logout();
  }
});