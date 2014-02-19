Meteor.openModal = (modalName, data) ->
  Session.set modalName, data

Meteor.closeModal = (modalName) ->
  Session.set modalName, undefined