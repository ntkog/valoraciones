Template.affinityFilter.created = function() {
  this.filter =  new ReactiveTable.Filter('affinity', ['affinity']);

}

Template.affinityFilter.helpers({
  title : function() {
    return Template.instance().filter.get() === "1" 
      ? "View All Talks"
      : "View Related to this Community";
  }

});


Template.affinityFilter.events({
  "click #btnAffinity" : function (e, tmpl) {    
    var lastValue = Template.instance().filter.get();
    
    if (lastValue === "1") {
      Template.instance().filter.set("");
      ReactiveTable.clearFilters(["byTag"]);  
    } else {
       Template.instance().filter.set("1");
    }
    
  }
});
