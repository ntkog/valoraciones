Meteor.publish("talks", function(){
  return Talks.find({});
});