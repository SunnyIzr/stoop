var CommentEvents = {
  init: function(){
    this.newLike();
    this.newComment();
    this.newCommentField();
  },
  newCommentField: function(){
    $(document).on('click','.addNewComment',function(e){
      e.preventDefault();
      $commentBar = $(this).closest('.comment-bar')
      postId = $(this).closest('.post').attr('class').split(' ')[1].replace('post-id-','')
      Comment.addCommentField($commentBar,postId)
    })
  },
  newLike: function(){
    $(document).on('ajax:success','.new_comment_like', function(e,data,status,xhr){
      Comment.refresh(data)
    })
  },
  newComment: function(){
    $(document).on('ajax:success','.new_comment', function(e,data,status,xhr){
      Comment.addNew(data)
    })
  }
}

var Comment = {
  refresh: function(comment){
    // ONLY refreshes view
    $el = $(".comment-id-" + comment.id)
    $el.find('.comment-like-count').html(comment.like_count)
    if ( comment.current_user_like ){
      $el.find('.current-user-comment-like').removeClass('fa-heart-o')
    } else {
      $el.find('.current-user-comment-like').addClass('fa-heart-o')
    }
  },
  addNew: function(comment){
    $('.post-id-' + comment.post.id ).find('.comment_field').remove()
    $('.post-id-' + comment.post.id ).find('.new_comment_body').remove()
    $el = $('.comment.hide').clone()
    $el.removeClass('hide')
    
    $el.addClass("comment-id-" + comment.id) 
    $el.find('.comment_body').html(comment.comment)
    $el.find('.time').html(comment.created_at_formatted)
    $el.find('.avatar').attr('src',comment.user.avatar)
    $el.find('.likeable_id').val(comment.id)
    
    $('.post-id-' + comment.commentable_id).find('.comments').append($el)
    Post.refresh(comment.post)
  },
  addCommentField: function($commentBar,postId){
    $el = $('.comment_field.hide').clone()
    $el.removeClass('hide')
    
    $el.find('input[name="comment[commentable_id]"]').val(postId)
    
    $commentBar.append($el)
    $el.find('.new_comment_body').focus()
  }
}