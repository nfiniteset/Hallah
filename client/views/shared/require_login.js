Template.requireLogin.helpers({
  loggingIn() {
    return Meteor.loggingIn();
  },
  noUser() {
    return !Meteor.loggingIn() && !Meteor.user();
  },
  loggedIn() {
    return Meteor.user();
  }
});
