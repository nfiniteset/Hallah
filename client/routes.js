// const route = (path, templateName) =>
//   FlowRouter.route(path, {
//     name: templateName,
//     action() { return render(templateName); }
//   }
//   )
// ;
// var render = templateName => BlazeLayout.render('layout', { main: templateName });

// FlowRouter.route('/', {
//   name: 'home',
//   action() { return render('dinnersPage'); }
// }
// );
// route('/dinners', 'dinnersPage');
// route('/guests', 'guestsPage');
// route('/history', 'historyPage');

BlazeLayout.render('layout');