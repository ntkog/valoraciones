Template.leaderboard.helpers({
  "talks" : function() {
    if(Meteor.userId()) {
      //var sort_by = AmplifiedSession.get('sort_by');
      //var sort_options = sort_by === 'name' ? {name: 1, score: 1} : {score: -1, name: 1};
      if (Session.equals("rank",true)) {
        return Talks.find({ affinity : true}, { sort : { Votes : -1 }});
      } else {
        return Talks.find({ affinity : true});
      }
    }
  }
});

Template.leaderboard.created = function () {
  this.subscribe("talks");
};