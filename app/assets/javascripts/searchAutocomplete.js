SearchAutocomplete = {
  init: function(){
    $('.search-query').keyup(function(e){
      SearchAutocomplete.showHideResultsBox()
    })
  },
  showHideResultsBox: function(){
    term = $('.search-query').val()
    if ( term.length > 2 ){
      $('.ui-autocomplete').show();
      SearchAutocomplete.getUsers(term)
      SearchAutocomplete.getBusinesses(term)
      SearchAutocomplete.getYelpBusinesses(term)
    } else {
      $('.ui-autocomplete').hide();
    }
  },
  getUsers: function(){
    $.post('/users/search', {term: term}, function(res){
      SearchAutocomplete.renderUsers(res)
    })
  },
  renderUsers: function(users){
    $('.usersList').html('')
    $(users).each(function(index,user){
      $el = $('<li class="ui-menu-item"><a href="/users/' + user['id'] + '"><img class="img-responsive mini-avatar" src="' + user['avatar'] + '"><span>' + user['name'] + '</span></a></li>')
      $('.usersList').append($el)
    })
  },
  getBusinesses: function(){
    $.post('/businesses/search', {term: term}, function(res){
      SearchAutocomplete.renderBusinesses(res)
    })
  },
  renderBusinesses: function(businesses){
    $('.bizList').html('')
    $(businesses).each(function(index,business){
      $el = $('<li class="ui-menu-item"><a href="/businesses/' + business['id'] + '"><img class="img-responsive mini-avatar" src="' + business['avatar'] + '"><span>' + business['name'] + '</span></a></li>')
      $('.bizList').append($el)
    })
  },
  getYelpBusinesses: function(){
    $.post('/yelp/search',{term: term},function(res){
      SearchAutocomplete.renderYelpBusinesses(res)
    })
  },
  renderYelpBusinesses: function(businesses){
    $('.yelpBizList').html('')
    $(businesses).each(function(index,business){
      $el = $('<li class="ui-menu-item"><a href="/unverified_businesses/' + business['id'] + '"><span>' + business['name'] + '</span></a></li>')
      $('.yelpBizList').append($el)
    })
  }
}