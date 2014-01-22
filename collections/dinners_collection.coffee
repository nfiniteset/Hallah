formatDate = (date) ->
  moment(date).format('dddd MMMM D')

@Dinners = new Meteor.Collection 'dinners',
  transform: (dinner) ->
    _(dinner).extend(formattedDate: formatDate(dinner.date))

Meteor.methods
  createDinner: ->
    unless Meteor.user()
      throw new Meteor.Error(422, 'You must be signed in to create a dinner');

    latestDinner = Dinners.findOne({ hostId: @userId }, { sort: { date: -1 } })
    latestDinnerDate = if latestDinner then latestDinner.date else new Date

    Dinners.insert
      hostId: @userId
      date: followingFriday(latestDinnerDate).valueOf()
