SearchAutocomplete = {
  init: function(){
    $('.search-query').keyup(function(e){
      SearchAutocomplete.getUsers()
    })
  },
  getUsers: function(){
    term = $('.search-query').val()
    if ( term.length > 2 ){
      $('.ui-autocomplete').show();
      $.post('/users/search', {term: term}, function(res){
        SearchAutocomplete.renderUsers(res)
      })
    } else {
      $('.ui-autocomplete').hide();
    }
  },
  renderUsers: function(users){
    $('.usersList').html('')
    $(users).each(function(index,user){
      $el = $('<li class="ui-menu-item"><a href="/users/' + user['id'] + '"><img class="img-responsive mini-avatar" src="' + user['avatar'] + '"><span>' + user['name'] + '</span></a></li>')
      $('.usersList').append($el)
    })
  }
}