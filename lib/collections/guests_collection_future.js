// import { Mongo } from 'meteor/mongo';

// const guestsCollection = new Mongo.Collection('guests');

// guestsCollection.allow({
//   update: (userId, guest) => guest.hostId == userId
// });

// Meteor.methods({
//   createGuest(params) {
//     if (!params.name) {
//       throw new Meteor.Error(422, 'Please fill in a name');
//     }

//     if (!params.dietaryRestrictionIds) {
//       params.dietaryRestrictionIds = [DietaryRestrictions.unknownRestriction()._id]
//     }

//     guestsCollection.insert({
//       hostId: this.userId,
//       name: params.name,
//       dietaryRestrictionIds: params.dietaryRestrictionIds
//     })
//   }
// });

// class Guests {
//   constructor() {
//     this.collection = guestsCollection;
//   }

//   invitable(invitedGuestIds) {
//     return this.collection.find({
//       _id: { $not: { $in: invitedGuestIds } }
//     })
//   }

//   insert(params, callback) {
//     Meteor.call('createGuest'), { name: name }, (err, id) => {
//       if (err) return alert(err);
//       return callback(id);
//     }
//   }

//   update(id, params, callback) {

//   }

//   all() {

//   }

//   find() {
    
//   }
// }

// export default new Guests();