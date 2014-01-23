Template.editGuest.created = ->
  @dietaryRestrictions = DietaryRestrictions.find()
  @dietaryRestrictions.observe
    added: (restriction) => _addDietaryRestrictionOption(@, restriction)

Template.editGuest.rendered = ->
  @selectize = _initSelectize(@)
  _buildDietaryRestrictionOptions(@)

_initSelectize = (template) ->
  dietaryRestrictionsEl = $(template.find('.js-select-dietary-restrictions'))
  dietaryRestrictionsEl.selectize
    create: true
    valueField: '_id'
    labelField: 'label'
    searchField: 'label'
    openOnFocus: false
    create: (label, callback) -> _createDietaryRestriction(label, template, callback)
  dietaryRestrictionsEl[0].selectize

_buildDietaryRestrictionOptions = (template) ->
  return unless template.selectize?
  template.dietaryRestrictions.rewind()

  template.selectize.clearOptions()
  template.selectize.addOption(template.dietaryRestrictions.fetch())
  template.selectize.setValue(template.data.dietaryRestrictionIds)

_addDietaryRestrictionOption = (template, restriction) ->
  return unless template.selectize?
  template.selectize.addOption restriction

_createDietaryRestriction = (label, template, callback) ->
  Meteor.call 'createDietaryRestriction', { label: label }, (err, id) ->
    return alert(err) if err
    _addDietaryRestrictionOption(template, DietaryRestrictions.findOne(id))
    template.selectize.addItem(id)
    template.selectize.blur()
    template.selectize.focus()
    callback()

Template.editGuest.events
  'submit form': (event, instance) ->
    event.preventDefault()
    guestAttributes =
      name: instance.find('[name=guestName]').value
      dietaryRestrictionIds: instance.selectize.getValue()


    Guests.update(@_id, { $set: guestAttributes })
    Session.set("editingGuest#{instance.data.invitationId}", false)

  'click .js-cancel': (event, instance) ->
    event.preventDefault()
    Session.set("editingGuest#{instance.data.invitationId}", false)
