@Dinners = new Meteor.Collection 'dinners',
  transform: (dinner) ->
    _(dinner).extend(formattedDate: moment(dinner.date).format('MMM D'))

followingFriday = (date) ->
  moment(date).day(12)

Meteor.methods
  createDinner: ->
    latestDinner = Dinners.findOne({}, { sort: { date: -1 } })
    latestDinnerDate = if latestDinner then latestDinner.date else new Date

    Dinners.insert
      date: followingFriday(latestDinnerDate).valueOf()