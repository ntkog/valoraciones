Template.leaderboard.events({
  'click .notRelated' : function() {
    Meteor.call("markAsNotRelated" , this._id, function (err) {
      if (err) {
        console.error(err);
      }
    });
  }
});

Template.leaderboard.helpers({
  "settings" : function() {
    return {
      collection : Talks,
      rowsPerPage : 5,
      showFilter : true,
      showColumnToggles : true,
      fields:  [
        "Title",
        { 
          key : "Description",
          label : "Description",
          cellClass : "justify" 
        },
        "tags",
        "techs",
        "Level",
        "Type",
        "Language",
        "Votes",
        {
          key: 'ThumbsUp',
          label : 'ThumbsUp',
          tmpl : Template.thumbsUp
        
        }
      ]
      
    }
  }
});

Template.leaderboard.created = function () {
  this.subscribe("talks");
};