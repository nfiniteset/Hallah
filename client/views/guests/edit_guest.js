import EditGuestPage from '../../react/containers/EditGuestPage';

Template.editGuest.helpers({
  editingGuest() {
    return Session.get('editingGuest');
  },
  EditGuestPage: () => EditGuestPage
});
