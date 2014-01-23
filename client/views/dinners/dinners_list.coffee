Template.dinnersList.helpers
  dinners: ->
    Dinners.find({}, { sort: { "date": -1 } })

Template.dinnersList.events
  'click .js-create-dinner': ->
    Meteor.call 'createDinner', (error, id) ->
      if (error)
        return alert(error.reason)
