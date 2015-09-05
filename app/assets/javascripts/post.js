var PostEvents = {
  init: function(){
    this.newLike();
    this.newPost();
  },
  newLike: function(){
    $(document).on('ajax:success','.new_like', function(e,data,status,xhr){
      Post.refresh(data)
    })
  },
  newPost: function(){
    $('.new_post').on('ajax:success', function(e,data,status,xhr){
      Post.addNew(data)
    })
  }
}

var Post = {
  getRefresh: function(id){
    //Gets Post data AND refreshes view
    $.getJSON('/posts/' + id, function(post){
      $el = $(".post-id-" + id)
      $el.find('.like-count span').html(post.like_count)
      $el.find('.comment-count span').html(post.comment_count)
      if ( post.current_user_like ){
        $el.find('.current-user-like').removeClass('fa-heart-o')
      } else {
        $el.find('.current-user-like').addClass('fa-heart-o')
      }
    })  
  },
  refresh: function(post){
    // ONLY refreshes view
    $el = $(".post-id-" + post.id)
    $el.find('.like-count span').html(post.like_count)
    $el.find('.comment-count span').html(post.comment_count)
    if ( post.current_user_like ){
      $el.find('.current-user-like').removeClass('fa-heart-o')
    } else {
      $el.find('.current-user-like').addClass('fa-heart-o')
    }
  },
  addNew: function(post){
    $('#new_post').find('textarea').val('')
    $el = $('.post.hide').clone()
    $el.removeClass('hide')
    
    $el.addClass("post-id-" + post.id) 
    $el.find('.body').html(post.body)
    $el.find('.time').html(post.created_at_formatted)
    $el.find('.name').html("<a href='/users/" + post.user.id + "'>"+ post.user.name + "</a>")
    $el.find('.avatar').attr('src',post.user.avatar)
    $el.find('.likeable_id').attr('value',post.id)
    
    $('.posts').prepend($el)
  }
}