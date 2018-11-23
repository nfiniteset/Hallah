let scrollPosition = undefined;

Meteor.openModal = function(modalName, data) {
  scrollPosition = $(document).scrollTop();

  Session.set(modalName, data);
  return $('.body__content')
    .height($(window).height())
    .css('overflow', 'hidden');
};

Meteor.closeModal = function(modalName) {
  Session.set(modalName, undefined);
  $('.body__content')
    .height('auto')
    .css('overflow', 'visible');
  return $(document).scrollTop(scrollPosition);
};
