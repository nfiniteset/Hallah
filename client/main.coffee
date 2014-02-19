scrollPosition = undefined

Meteor.openModal = (modalName, data) ->
  scrollPosition = $(document).scrollTop()

  Session.set modalName, data
  $('.body__content')
    .height($(window).height())
    .css('overflow', 'hidden')

Meteor.closeModal = (modalName) ->
  Session.set modalName, undefined
  $('.body__content')
    .height('auto')
    .css('overflow', 'visible')
  $(document).scrollTop(scrollPosition)
