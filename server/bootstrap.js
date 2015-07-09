Meteor.startup(function () {
    // On server startup, create some players if the database is empty.
    community = "HTML5-Spain";
    var talks = [
      { title : "Charla 1",
        author: "Author 1",
        desc  : "desc 1",
        score : 0
      },
      { title : "Charla 2",
        author: "Author 2",
        desc  : "desc 2",
        score : 0
      },
      { title : "Charla 3",
        author: "Author 3",
        desc  : "desc 3",
        score : 0
      }
    ];
  
    if (Talks.find().count() === 0) {
      talks.forEach(function (talk) {
        Talks.insert(talk);
      });
    }
    
  });