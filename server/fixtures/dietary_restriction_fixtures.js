import DietaryRestrictions, { UNKNOWN_RESTRICTION_LABEL } from '../../imports/api/DietaryRestrictions';

if (!DietaryRestrictions.unknownRestriction()) {
  DietaryRestrictions.insert({ "label": UNKNOWN_RESTRICTION_LABEL })
}
