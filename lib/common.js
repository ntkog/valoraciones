UI.registerHelper('isAdmin', function(context, options) { 
  return Meteor.user() && Meteor.user().profile.role === "admin";
});
UI.registerHelper('notImportedYet', function(context, options) { 
  return Talks.find({}).count() === 0;
});
UI.registerHelper('isLogged', function(context, options) { 
  return Meteor.user();
});
UI.registerHelper('avatar', function(context, options) { 
  return Meteor.user().profile.photo;
});
UI.registerHelper('hasNotVoted', function(context, options) { 
  if(Meteor.user().profile.hasVoted === false) {
    
    return true;
  } else {
    
    sAlert.info("Ya hemos registrado tu voto");
    return false;
  }
});



MyVotes = new ReactiveArray();