LiveSearch = {
  init: function(){
    this.userSearch();
  },
  userSearch: function(){
    $('.search-query').bind('railsAutocomplete.select', function(event, data){
        window.location.href = '/users/' + data.item.id
      });
  }
}