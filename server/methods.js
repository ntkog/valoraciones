techAffinity = ["Web", "Mobile"];
langAffinity = ["Javascript"];


function affinity (title, desc, codeLanguage, technologies) {
  var re = /\b(JS|JAVASCRIPT|CSS|CSS3|HTML|HTML5|NODE|GRUNT|GULP|METEOR|POLYMER|COMPONENTS)\b/gi;
  console.log(title);
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
  "voteTalk" : function (talkId, votes) {
    
    console.log("llego a voteTalk");
    if( parseInt(Meteor.user().profile.credits,0) - votes >= 0) {
        console.log("Apunto");
        Talks.update({ _id: talkId }, {$inc: {Votes: votes}}); 
        Meteor.users.update({ _id : Meteor.user()._id }, { $inc : { "profile.credits" : -votes } });
    } else {
        console.log("Error");
      throw new Meteor.Error(503, 
      "Too much votes. You only have:" + Meteor.user().profile.credits + " left" );              
    }
  }
});