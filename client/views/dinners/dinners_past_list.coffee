Template.dinnersPastList.helpers
  dinners: ->
    today = moment().startOf('day').toDate().getTime()
    Dinners.find({"date": { $lt: today }}, { sort: { "date": -1 } })
