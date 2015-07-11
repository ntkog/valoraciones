UI.registerHelper('isAdmin', function(context, options) { 
  return Meteor.user() && Meteor.user().profile.role === "admin";
});
UI.registerHelper('notImportedYet', function(context, options) { 
  return Talks.find({}).count() === 0;
});
UI.registerHelper('isLogged', function(context, options) { 
  return Meteor.user();
});