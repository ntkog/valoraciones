Template.byTagFilter.created = function() {
  this.filter = new ReactiveTable.Filter('byTag', ['Title','Description']);
}

Template.byTagFilter.helpers({
  tags : function() {  
    return "JAVASCRIPT|CSS|HTML5|NODE|METEOR|WEB COMPONENTS|WEBGL".split("|");
  }

});


Template.byTagFilter.events({
  "click .byTag" : function (e, tmpl) {
    //ReactiveTable.clearFilters(["affinity"]);
    var re;
    var tag =  e.currentTarget.dataset.current;
    switch(tag) {
      case 'JAVASCRIPT' :
        re = /\b(Javascript|JS|ANGULAR|REACT|D3)\b/i;
        break;
      case 'HTML5' :
        re = /\b(HTML|HTML5)\b/i;
        break;
      case 'CSS' :
        re = /\b(CSS|CSS2|CSS3)\b/i;
        break;
      case 'NODE' :
        re = /\b(NODE|NODEJS|NODE.JS)\b/i;
        break;
      case 'WEB COMPONENTS' :
        re = /\b(COMPONENTS|WEB COMPONENTS|POLYMER)\b/i;
        break;
      case 'WEBGL' :
        re = /\b(WEBGL|WEB GL)\b/i;
        break;
      case 'METEOR' :
        re = /\b(METEOR|METEOR.JS)\b/i;
        break;
    }
    Template.instance().filter.set({ $regex :  re });
    
  }
});