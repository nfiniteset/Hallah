@followingFriday = (date) ->
  date = moment(date)
  friOrSat = _([5,6]).include date.day()
  date.day(if friOrSat then 12 else 5)
