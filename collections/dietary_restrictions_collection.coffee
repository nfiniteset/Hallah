@UNKNOWN_RESTRICTION_LABEL = 'unknown'

@DietaryRestrictions = new Meteor.Collection 'dietary_restrictions',
  transform: (restriction) ->
    restriction.unknown = restriction.label == UNKNOWN_RESTRICTION_LABEL
    restriction

DietaryRestrictions.unknownRestriction = ->
  @findOne "label": UNKNOWN_RESTRICTION_LABEL

Meteor.methods
  createDietaryRestriction: (params) ->
    dietaryRestrictionAttributes =
      "label": params.label

    existingDietaryRestriction = DietaryRestrictions.findOne(dietaryRestrictionAttributes)
    return existingDietaryRestriction._id if existingDietaryRestriction

    DietaryRestrictions.insert dietaryRestrictionAttributes
