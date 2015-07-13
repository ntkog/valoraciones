/*jshint bitwise:true, browser:true, curly:true, eqeqeq:true, evil:true, forin:true, indent:2, latedef: true, maxerr:50, noarg:true, noempty:true, plusplus:true, regexp:false, undef:true, white:true */
/*global $, jQuery, _, Meteor, Session, Template, amplify */

// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Leaderboard = {};


if (Meteor.isClient) {

  Accounts.onLoginFailure(function(err){
    sAlert.error(err);
  });

}




