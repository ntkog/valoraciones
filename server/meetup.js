community = "HTML5-Spain";

Accounts.onCreateUser(function(options, user){      
  var accessToken = user.services.meetup.accessToken;
  try {
    var result =   
      Meteor.http.get('https://api.meetup.com/2/profiles.json/?member_id=' + user.services.meetup.id,{
        headers: {
          "User-Agent": "Meteor/1.0",
          "Authorization" : "Bearer " + accessToken
        }
    });
  } catch (error) {
    throw error;
  }

  debugger;
  var profile = 
    result.data.results
      .filter(function (prof) { 
        return prof.group.urlname === community; 
      })
      .map(function (prof) { 
        return {
          name : prof.name,
          photo : prof.photo_url,
          role : _.contains(["Organizer","Assistant Organizer","Co-Organizer","Event Organizer"],prof.role) ? "admin" : "member"
        };
      })[0];

  if (profile) {
    profile.hasVoted = false;
    user.profile = profile;
    return user;
  } else {
    throw new Meteor.Error(503, 
      "The user has to belong to Meetup Community");
    return false;
  }
  

});



