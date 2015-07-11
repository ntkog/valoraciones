Template.thumbsUp.events({
  'click .increment': function () {
    Talks.update(this._id, {$inc: {Votes: 5}});
    return false;
  },
});