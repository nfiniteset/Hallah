import DietaryRestrictions, { UNKNOWN_RESTRICTION_LABEL } from '../../imports/api/dietaryRestrictions';

if (!DietaryRestrictions.unknownRestriction()) {
  DietaryRestrictions.insert({ "label": UNKNOWN_RESTRICTION_LABEL })
}
