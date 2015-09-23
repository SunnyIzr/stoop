var PostEvents = {
  init: function(){
    this.newLike();
    this.newPost();
    this.toggleCheckinPost();
    this.togglePostTypes();
  },
  newLike: function(){
    $(document).on('ajax:success','.new_post_like', function(e,data,status,xhr){
      Post.refresh(data)
    })
  },
  newPost: function(){
    $('.new_post').on('ajax:success', function(e,data,status,xhr){
      console.log('success!')
      window.data = data
      Post.addNew(data)
    })
  },
  togglePostTypes: function(){
    $('.imgPost').click(function(e){
      e.preventDefault();
      if ( $('.dropzone').hasClass('hide') ){
        $('.non-dropzone').addClass('hide')
        $('.dropzone').removeClass('hide')
        $('#map-container').addClass('hide')
      } else {
        $('.dropzone').addClass('hide')
        $('.non-dropzone').removeClass('hide')
      }
    })
  },
  toggleCheckinPost: function(){
    $('.checkInPost').click(function(e){
      e.preventDefault();
      if ( $('#search-map-container').hasClass('hide') ){
        $('#search-map-container').removeClass('hide')
        if ( searchMap == null ){
          navigator.geolocation.getCurrentPosition(function(pos){
            GooglePlaces.init(pos.coords.latitude,pos.coords.longitude)
          })
        }
      } else {
        $('#search-map-container').addClass('hide')
      }
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
    $('#search-map-container').addClass('hide')
    
    $el.addClass("post-id-" + post.id) 
    $el.find('.body').html(post.body)
    $el.find('.time').html(post.created_at_formatted)
    $el.find('.name').html("<a href='/users/" + post.user.id + "'>"+ post.user.name + "</a>")
    $el.find('.avatar').attr('src',post.user.avatar)
    $el.find('.likeable_id').attr('value',post.id)
    if ( post.image_present == true ){
      $el.find('.post-img').removeClass('hide')
      $el.find('.post-img').attr('src',post.image)
    }
    if ( post.lat.length > 0 && post.lng.length > 0 ){
      $el.find('.map-canvas').attr('data-lat',post.lat);
      $el.find('.map-canvas').attr('data-lng',post.lng);
      setTimeout(function(){
        $el.find('.map-container').removeClass('hide')
        GoogleMaps.init()
      },2500)
    }
    
    $('.posts').prepend($el)
  },
  persistCheckIn: function(){
    lat = map.center.H
    lng = map.center.L
    $('#post_lat').val(lat)
    $('#post_lng').val(lng)
  }
}