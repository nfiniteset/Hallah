@Dinners = new Meteor.Collection('dinners')

followingFriday = (date) ->
  moment(date).day(12)

Meteor.methods
  createDinner: ->
    latestDinner = Dinners.findOne({}, { sort: { date: -1 } })
    latestDinnerDate = if latestDinner then latestDinner.date else new Date

    Dinners.insert
      date: followingFriday(latestDinnerDate).valueOf()