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

