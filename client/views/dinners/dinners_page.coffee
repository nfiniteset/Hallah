Template.dinnersPage.helpers
  dinners: ->
    today = moment().startOf('day').toDate().getTime()
    Dinners.find({"date": { $gte: today }}, { sort: { "date": 1 } })

Template.dinnersPage.events
  'click .js-create-dinner': ->
    Meteor.call 'createDinner', (error, id) ->
      if (error)
        return alert(error.reason)
