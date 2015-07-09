/*jshint bitwise:true, browser:true, curly:true, eqeqeq:true, evil:true, forin:true, indent:2, latedef: true, maxerr:50, noarg:true, noempty:true, plusplus:true, regexp:false, undef:true, white:true */
/*global $, jQuery, _, Meteor, Session, Template, amplify */

// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

var Leaderboard = {};



if (Meteor.isClient) {

  // A version of Session that also store the key/value pair to local storage
  // using Amplify
  var AmplifiedSession = _.extend({}, Session, {
    keys: _.object(_.map(amplify.store(), function (value, key) {
      return [key, JSON.stringify(value)];
    })),
    set: function (key, value) {
      Session.set.apply(this, arguments);
      amplify.store(key, value);
    }
  });

  Template.navbar.helpers({
    "sort_by_is" : function (sort_by) {
      return (AmplifiedSession.get('sort_by') || 'score') === sort_by;
    }
  });
  
  Template.navbar.events({
    'click .sort_by_score': function () {
      AmplifiedSession.set('sort_by', 'score');
    },
    'click .sort_by_name': function () {
      AmplifiedSession.set('sort_by', 'name');
    }

  });

  Template.leaderboard.helpers({
    "talks" : function() {
      if(Meteor.userId()) {
        var sort_by = AmplifiedSession.get('sort_by');
        var sort_options = sort_by === 'name' ? {name: 1, score: 1} : {score: -1, name: 1};
        return Talks.find({}, {sort: sort_options});
      }
    }
  });
  
  Template.leaderboard.created = function () {
    this.subscribe("talks");
  };
  
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
      return AmplifiedSession.equals('selected_player', this._id);
    }
  
  });
  
  
  Template.talk.events({
    'click .increment': function () {
      Talks.update(this._id, {$inc: {score: 5}});
      return false;
    },
    'click .decrement': function () {
      Talks.update(this._id, {$inc: {score: -5}});
      return false;
    },
    'click .remove': function (event, template) {
      var self = this;
      $(template.find('tr')).fadeOut('fast', function () {
        Talks.remove(self._id);
      });
      return false;
    },
    'click': function () {
      AmplifiedSession.set('selected_player', this._id);
    }
  });
  
  
  Template.talk.rendered = function () {
    $(this.findAll('[rel=tooltip]')).tooltip();
  };

  Accounts.onLoginFailure(function(err){
    Session.set('displayMessage', err.reason);
  });

  Meteor.autorun(function() {
    // Whenever this session variable changes, run this function.
    var message = Session.get('displayMessage');
    if (message) {
      var stringArray = message.split('&amp;');
      ui.notify(stringArray[0], stringArray[1])
        .effect('slide')
        .closable();

      Session.set('displayMessage', null);
    }
  });

}




