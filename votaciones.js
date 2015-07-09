/*jshint bitwise:true, browser:true, curly:true, eqeqeq:true, evil:true, forin:true, indent:2, latedef: true, maxerr:50, noarg:true, noempty:true, plusplus:true, regexp:false, undef:true, white:true */
/*global $, jQuery, _, Meteor, Session, Template, amplify */

// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

var Players = new Meteor.Collection('players');

var Leaderboard = {};
Leaderboard.getRandomScore = function () {
  return Math.floor(Math.random() * 10) * 5;
};
Leaderboard.resetPlayers = function () {
  Players.remove({});
  var names = [
    'Ada Lovelace',
    'Grace Hopper',
    'Marie Curie',
    'Carl Friedrich Gauss',
    'Nikola Tesla',
    'Claude Shannon'
  ];
  for (var i = 0; i < names.length; i += 1) {
    Players.insert({name: names[i], score: Leaderboard.getRandomScore()});
  }
};
Leaderboard.randomizeScores = function () {
  Players.find().forEach(function (player) {
    Players.update(player._id, {$set: {score: Leaderboard.getRandomScore()}});
  });
};
Leaderboard.addPlayer = function (player_name) {
  var trimmed = $.trim(player_name);
  if (trimmed.length) {
    Players.insert({name: trimmed, score: Leaderboard.getRandomScore()});
  }
};

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

  Template.navbar.sort_by_is = function (sort_by) {
    return (AmplifiedSession.get('sort_by') || 'score') === sort_by;
  };
  Template.navbar.events({
    'click .sort_by_score': function () {
      AmplifiedSession.set('sort_by', 'score');
    },
    'click .sort_by_name': function () {
      AmplifiedSession.set('sort_by', 'name');
    },
    'click .randomize': function () {
      Leaderboard.randomizeScores();
    },
    'click .reset': function () {
      Leaderboard.resetPlayers();
    },
    'click .add_user': function (event, template) {
      var player = template.find('input.player_name');
      Leaderboard.addPlayer(player.value);
      player.value = '';
    }
  });

  Template.leaderboard.players = function () {
    var sort_by = AmplifiedSession.get('sort_by');
    var sort_options = sort_by === 'name' ? {name: 1, score: 1} : {score: -1, name: 1};
    return Players.find({}, {sort: sort_options});
  };

  Template.player.selected = function () {
    return AmplifiedSession.equals('selected_player', this._id);
  };
  Template.player.is_max = function () {
    var max = Players.findOne({}, {sort: {'score': -1, name: 1}});
    return max && max._id === this._id;
  };
  Template.player.is_min = function () {
    var min = Players.findOne({}, {sort: {'score': 1, name: -1}});
    return min && min._id === this._id;
  };
  Template.player.events({
    'click .increment': function () {
      Players.update(this._id, {$inc: {score: 5}});
      return false;
    },
    'click .decrement': function () {
      Players.update(this._id, {$inc: {score: -5}});
      return false;
    },
    'click .remove': function (event, template) {
      var self = this;
      $(template.find('tr')).fadeOut('fast', function () {
        Players.remove(self._id);
      });
      return false;
    },
    'click': function () {
      AmplifiedSession.set('selected_player', this._id);
    }
  });
  Template.player.rendered = function () {
    $(this.findAll('[rel=tooltip]')).tooltip();
  };
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // On server startup, create some players if the database is empty.
    if (Players.find().count() === 0) {
      Leaderboard.resetPlayers();
    }
  });
}

