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
  },
  newComment: function(){
    $(document).on('ajax:success','.new_comment', function(e,data,status,xhr){
      Comment.addNew(data)
    })
  }
}

var Comment = {
  getRefresh: function(id){
    //Gets Comment data AND refreshes view
  },
  refresh: function(comment){
    // ONLY refreshes view
  },
  addNew: function(comment){
    $('.post-id-' + comment.post.id ).find('.new_comment_body').val('')
    $('.post-id-' + comment.post.id ).find('.new_comment_body').blur()
    $el = $('.comment.hide').clone()
    $el.removeClass('hide')
    
    $el.addClass("comment-id-" + comment.id) 
    $el.find('.comment_body').html(comment.comment)
    $el.find('.time').html(comment.created_at_formatted)
    $el.find('.avatar').attr('src',comment.user.avatar)
    
    $('.post-id-' + comment.commentable_id).find('.comments').append($el)
  },
  addCommentField: function($commentBar,postId){
    $el = $('.comment_field.hide').clone()
    $el.removeClass('hide')
    
    $el.find('input[name="comment[commentable_id]"]').val(postId)
    
    $commentBar.append($el)
    $el.find('.new_comment_body').focus()
  }
}