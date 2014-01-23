@DietaryRestrictions = new Meteor.Collection 'dietary_restrictions'

Meteor.methods
  createDietaryRestriction: (params) ->
    dietaryRestrictionAttributes =
      "label": params.label

    existingDietaryRestriction = DietaryRestrictions.findOne(dietaryRestrictionAttributes)
    return existingDietaryRestriction._id if existingDietaryRestriction

    DietaryRestrictions.insert dietaryRestrictionAttributes
