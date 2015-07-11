techAffinity = ["Web", "Mobile"];
langAffinity = ["Javascript"];

function affinity (title, desc, codeLanguage, technologies) {
  var re = /(JS|CSS|HTML|NODE|GRUNT|GULP|METEOR)/gi;
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
  
  return subjectOK || langOK.length > 0;      
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
  }
});