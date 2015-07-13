techAffinity = ["Web", "Mobile"];
langAffinity = ["Javascript"];


function affinity (title, desc, codeLanguage, technologies) {
  var re = /\b(JS|JAVASCRIPT|CSS|CSS3|HTML|HTML5|WEBGL|NODE|GRUNT|GULP|METEOR|POLYMER|COMPONENTS)\b/gi;
  var matchesTitle = title.match(re);
  var matchesDesc = desc.match(re);
  var subjectOK = matchesTitle || matchesDesc ? true : false;
  var langOK = langAffinity.filter(function(l) { 
    return _.contains(codeLanguage,l); 
  });
  var techOK = techAffinity.filter(function(t) { 
    return _.contains(technologies,t); 
  });
  
  return subjectOK || langOK.length > 0 ? 1 : 0;      
}

function processCommas ( datum) {
  return datum && datum.match(/,/)
    ? datum.split(",").map(function(tag){
            return tag.replace(" ", "", "g")
           })
    : datum === ""
        ? []
        : [ datum ];
}


Meteor.methods({
  "addTalks" : function (data) {
    
    if( Meteor.user().profile.role === "admin") {
      data.forEach(function (objLine) {

        objLine.tags = processCommas(objLine["CodeLanguage"]);
        objLine.techs = processCommas(objLine["Technology"]);      
        objLine.affinity = 
          affinity(objLine["Title"], objLine["Description"], objLine.tags, objLine.techs);

        objLine["Votes"] = 0;
        
        Talks.insert(objLine);

      });
    }
  },
  "markAsNotRelated" : function ( talkId ) {
    if( Meteor.user().profile.role === "admin") {
      Talks.update({ _id : talkId } , { $set : { affinity : false } });
    }
  },
  "vote" : function (votes) {
    if (Meteor.user().profile.hasVoted) {
      throw new Meteor.Error(503, "You've already voted");
    } else {
      var list = _.groupBy(votes,"talkId");
      Object.keys(list).forEach(function (k) {
        var currentVote = {
          talkId : k,
          votes : list[k].length === 1 ? list[k][0].votes : list[k][list[k].length -1].votes
        };
        Talks.update({ _id: currentVote.talkId }, {$inc: {Votes: currentVote.votes}});
        Meteor.users.update({ _id : Meteor.userId() },{$set : { "profile.hasVoted" : true }})
      });
    }
    
      
  }
});