export default function followingFriday(date) {
  date = moment(date);
  const friOrSat = _([5,6]).include(date.day());
  return date.day(friOrSat ? 12 : 5);
};
