import Guests from '../../../imports/api/guests';

Template.newInvitation.created = function() {
  this.dinnerInvites = Invitations.find({"dinnerId": this.data._id});
  return _observeInvitations.apply(this);
};

var _observeInvitations = function() {
  return this.dinnerInvites.observe({
    added: invite => _buildInvitableGuestsOptions.apply(this),
    removed: oldInvte => _buildInvitableGuestsOptions.apply(this)
  });
};

Template.newInvitation.rendered = function() {
  this.selectize = _initSelectize(this);
  return _buildInvitableGuestsOptions.apply(this);
};

var _initSelectize = function(template) {
  const invitableGuestsEl = $(template.find('.js-invite-guest'));
  invitableGuestsEl.selectize({
    create: true,
    valueField: '_id',
    labelField: 'name',
    searchField: 'name',
    openOnFocus: false,
    create(name, callback) { return _createAndInviteGuest(name, template, callback); }
  });
  return invitableGuestsEl[0].selectize;
};

var _buildInvitableGuestsOptions = function() {
  this.dinnerInvites.rewind();
  const invitedGuestIds = this.dinnerInvites.map(invite => invite.guestId);
  const guests = Guests.invitable(invitedGuestIds).fetch();

  if (this.selectize != null) {
    this.selectize.clearOptions();
    return this.selectize.addOption(guests);
  }
};

Template.newInvitation.destroyed = function() {
  return this.find('.js-invite-guest').selectize.destroy();
};



Template.newInvitation.events({
  'change .js-invite-guest'(event, instance) {
    const guestId = $(event.currentTarget).val();
    if (!guestId) { return; }

    _inviteGuest(guestId, instance);
    return instance.selectize.clear();
  }
});

var _createAndInviteGuest = (name, template, callback) =>
  _createGuest(name, guestId =>
    _inviteGuest(guestId, template, () => callback())
  )
;

var _createGuest = (name, callback) =>
  Meteor.call('createGuest', { name }, function(err, id) {
    if (err) { return alert(err); }
    return callback(id);
  })
;

var _inviteGuest = function(guestId, template, callback) {
  const invitationAttributes = {
    guestId,
    dinnerId: template.data._id
  };

  return Meteor.call('createInvitation', invitationAttributes, function(err, id) {
    if (err) { return alert(err); }
    _buildInvitableGuestsOptions.apply(template);
    if (callback != null) { callback(); }
    template.selectize.clear();
    template.selectize.blur();
    return template.selectize.focus();
  });
};
