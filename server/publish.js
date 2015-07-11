Meteor.publish("talks", function(affinity){
  return Talks.find({ affinity : affinity });
});