Template.thumbsUp.events({
  'blur .increment': function (e,tmpl) {
    var talkId = e.currentTarget.dataset.talk;
    var votes = parseInt(document.querySelector('input[data-talk="' + talkId + '"]').value,0);

    if ( votes > 0 && votes <= 10) {
      MyVotes.push({ talkId : talkId, votes: votes} );
    } else {
      sAlert.error("Votes has to be between 0 and 10");
    }
    
    /*
    if ( parseInt(Meteor.user().profile.credits,0) - votes >= 0 ) {
      Meteor.call("voteTalk", talkId , votes, function (err){
        if(err) {
          sAlert.error(err);
        }
      });
    } else {
      var error = Meteor.user().profile.credits === 0 
        ? "You've already consumed your votes. Thanks for voting"
        : "You only have " + Meteor.user().profile.credits + " left";
      sAlert.error(error);
    }*/
  }
});

Template.thumbsUp.helpers({

  'talkId' : function() {
    return this._id;
  }
});