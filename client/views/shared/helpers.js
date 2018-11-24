import InvitationStates from '../../../imports/api/invitationStates';

Handlebars.registerHelper("debug", function(optionalValue) {
  console.log("Current Context");
  console.log("====================");
  console.log(this);

  if (optionalValue) {
    console.log("Value");
    console.log("====================");
    return console.log(optionalValue);
  }
});

Handlebars.registerHelper("formatDate", date => Meteor.formatDate(date));

Handlebars.registerHelper("year", date => moment(date).format('YYYY'));

Handlebars.registerHelper("currentUserLabel", function() {
  const currentUser = Meteor.user();
  if (!currentUser) { return; }
  return currentUser.emails[0].address;
});

Handlebars.registerHelper("invitationStateCodeFor", stateId => InvitationStates.codeFor(stateId));

Handlebars.registerHelper("invitationStateLabelFor", stateId => InvitationStates.labelFor(stateId));
