Template.ControlPanel.events({
  "click .vote" : function( e, tmpl) {
    Meteor.call("vote", MyVotes, function(err) {
      if(err) {
        sAlert.error(err);
      }
    });
  }
});