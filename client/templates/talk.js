Template.talk.helpers({
  "is_min" : function () {
    var min = Talks.findOne({}, {sort: {'score': 1, name: -1}});
    return min && min._id === this._id;
  },
  "is_max" : function () {
    var max = Talks.findOne({}, {sort: {'score': -1, name: 1}});
    return max && max._id === this._id;
  },
  "selected" : function () {
    return Session.equals('selected_player', this._id);
  },
  "showFormatted" : function (context) {
    return context.join(",");
  }

});


Template.talk.events({
  'click .increment': function () {
    Talks.update(this._id, {$inc: {Votes: 5}});
    return false;
  },
  'click': function () {
    Session.set('selected_player', this._id);
  },
  'click .notRelated' : function() {
    Meteor.call("markAsNotRelated" , this._id, function (err) {
      if (err) {
        console.error(err);
      }
    });
  }
});


Template.talk.rendered = function () {
  $(this.findAll('[rel=tooltip]')).tooltip();
};