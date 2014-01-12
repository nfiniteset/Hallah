Template.dinnerItem.helpers
  invitations: ->
    Invitations.find "dinnerId": @_id
