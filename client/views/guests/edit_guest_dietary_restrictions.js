import DietaryRestrictions from '../../../imports/api/dietaryRestrictions';

Template.editGuestDietaryRestrictions.created = function() {
  this.dietaryRestrictions = DietaryRestrictions.find();
  return this.dietaryRestrictions.observe({
    added: restriction => _addDietaryRestrictionOption(this, restriction)});
};

Template.editGuestDietaryRestrictions.rendered = function() {
  this.selectize = _initSelectize(this);
  return _buildDietaryRestrictionOptions(this);
};

var _initSelectize = function(template) {
  const dietaryRestrictionsEl = $(template.find('.js-select-dietary-restrictions'));
  dietaryRestrictionsEl.selectize({
    create: true,
    valueField: '_id',
    labelField: 'label',
    searchField: 'label',
    openOnFocus: false,
    create(label, callback) { return _createDietaryRestriction(label, template, callback); }
  });
  return dietaryRestrictionsEl[0].selectize;
};

var _buildDietaryRestrictionOptions = function(template) {
  if (template.selectize == null) { return; }
  template.dietaryRestrictions.rewind();

  template.selectize.clearOptions();
  template.selectize.addOption(template.dietaryRestrictions.fetch());
  return template.selectize.setValue(template.data.dietaryRestrictionIds);
};

var _addDietaryRestrictionOption = function(template, restriction) {
  if (template.selectize == null) { return; }
  return template.selectize.addOption(restriction);
};

var _createDietaryRestriction = (label, template, callback) =>
  Meteor.call('createDietaryRestriction', { label }, function(err, id) {
    if (err) { return alert(err); }
    _addDietaryRestrictionOption(template, DietaryRestrictions.findOne(id));
    template.selectize.addItem(id);
    template.selectize.blur();
    template.selectize.focus();
    return callback();
  })
;
