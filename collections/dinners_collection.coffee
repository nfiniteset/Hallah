@Dinners = new Meteor.Collection 'dinners',
  transform: (dinner) ->
    _(dinner).extend(formattedDate: moment(dinner.date).format('MMM D'))

followingFriday = (date) ->
  moment(date).day(12)

Meteor.methods
  createDinner: ->
    unless Meteor.user()
      throw new Meteor.Error(422, 'You must be signed in to create a dinner');

    latestDinner = Dinners.findOne({}, { sort: { date: -1 } })
    latestDinnerDate = if latestDinner then latestDinner.date else new Date

    Dinners.insert
      hostId: Meteor.user()._id
      date: followingFriday(latestDinnerDate).valueOf()
