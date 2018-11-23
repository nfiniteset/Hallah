this.Dinners = new Meteor.Collection('dinners');

Dinners.allow({
  update(dinner) {
    return this.userId === dinner.hostId;
  }
});

Meteor.methods({
  createDinner() {
    if (!Meteor.user()) {
      throw new Meteor.Error(422, 'You must be signed in to create a dinner');
    }

    const latestDinner = Dinners.findOne({ hostId: this.userId }, { sort: { date: -1 } });
    const today = new Date;
    const latestDinnerDate = latestDinner && (latestDinner.date > today) ?
      latestDinner.date
    :
      today;

    return Dinners.insert({
      hostId: this.userId,
      date: followingFriday(latestDinnerDate).valueOf()
    });
  }
});