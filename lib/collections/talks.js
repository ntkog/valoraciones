Talks = new Mongo.Collection('talks');


if (Meteor.isServer) {
  Talks.allow({
    insert: function (userId, doc) {
      
      return Meteor.userId();
    },

    update: function (userId, doc, fieldNames, modifier) {
      return Meteor.userId();
    },

    remove: function (userId, doc) {
      return Meteor.userId();
    }
  });

}