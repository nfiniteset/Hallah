import DietaryRestrictions, { UNKNOWN_RESTRICTION_LABEL } from '../../lib/api/DietaryRestrictions';

if (!DietaryRestrictions.unknownRestriction()) {
  DietaryRestrictions.insert({ "label": UNKNOWN_RESTRICTION_LABEL });
}
