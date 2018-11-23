this.UNKNOWN_RESTRICTION_LABEL = 'unknown';

this.DietaryRestrictions = new Meteor.Collection('dietary_restrictions', {
  transform(restriction) {
    restriction.unknown = restriction.label === UNKNOWN_RESTRICTION_LABEL;
    return restriction;
  }
}
);

DietaryRestrictions.unknownRestriction = function() {
  return this.findOne({"label": UNKNOWN_RESTRICTION_LABEL});
};

Meteor.methods({
  createDietaryRestriction(params) {
    const dietaryRestrictionAttributes =
      {"label": params.label};

    const existingDietaryRestriction = DietaryRestrictions.findOne(dietaryRestrictionAttributes);
    if (existingDietaryRestriction) { return existingDietaryRestriction._id; }

    return DietaryRestrictions.insert(dietaryRestrictionAttributes);
  }
});