/*jshint bitwise:true, browser:true, curly:true, eqeqeq:true, evil:true, forin:true, indent:2, latedef: true, maxerr:50, noarg:true, noempty:true, plusplus:true, regexp:false, undef:true, white:true */
/*global $, jQuery, _, Meteor, Session, Template, amplify */

// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

Leaderboard = {};

if (Meteor.isClient) {

  // A version of Session that also store the key/value pair to local storage
  // using Amplify
  Session.set("rank", false);
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




