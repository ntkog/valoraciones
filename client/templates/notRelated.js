Template.notRelated.events({
  "click .notRelated" : function(e, tmpl) {
    
    console.log("click");
    Meteor.call("markAsNotRelated" , this._id, function(err) {
      if(err) {
        sAlert.error(err);
      }
    });
  }
});