import App from '../react/App';

Template.layout.onCreated(function() {
  const template = this;
  return template.autorun(function() {
    template.subscribe('allDinners');
    template.subscribe('allGuests');
    template.subscribe('invitations');
    template.subscribe('invitationStates');
    return template.subscribe('dietaryRestrictions');
  });
});

Template.layout.helpers({
  appReady() {
    return Template.instance().subscriptionsReady();
  },
  App: () => App
});
