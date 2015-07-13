Template.affinityFilter.created = function() {
  this.filter =  new ReactiveTable.Filter('affinity', ['affinity']);

}

Template.affinityFilter.helpers({
  title : function() {
    return Template.instance().filter.get() === "1" 
      ? "Todas las charlas"
      : "Recomendadas en base a tecnologías afines a HTML5-Spain";
  }

});


Template.affinityFilter.events({
  "click #btnAffinity" : function (e, tmpl) {    
    var lastValue = Template.instance().filter.get();
    
    if (lastValue === "1") {
      Template.instance().filter.set("");
      
    } else {
       Template.instance().filter.set("1");
    }
    ReactiveTable.clearFilters(["byTag"]);  
    
  }
});
